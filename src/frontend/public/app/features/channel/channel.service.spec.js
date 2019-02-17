import ChannelModule from './channel.module.ajs';

import { stubGameHttpServiceNg1 } from '../../testing/stubs/custom/game-http.service.stub';
import { stubChannelHttpServiceNg1 } from '../../testing/stubs/custom/channel-http.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('channel service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let gameHttpStub;
    let channelHttpStub;

    beforeEach(module(ChannelModule));

    beforeEach('stubs setup', () => {

        gameHttpStub = stubGameHttpServiceNg1(module, inject);
        channelHttpStub = stubChannelHttpServiceNg1(module, inject);

        gameHttpStub.setupStub();
        channelHttpStub.setupStub();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('channelService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('refreshChannels()', () => {

        let outdated;

        beforeEach('refreshChannels() test setup', () => {

            outdated = [

                {
                    provider_id: 0,
                    provider_channel_id: 2,
                    streamer_name: 'name_1',
                    title: 'title_1',
                    view_count: 1
                },
                {
                    provider_id: 0,
                    provider_channel_id: 5,
                    streamer_name: 'name_2',
                    title: 'title_2',
                    view_count: 5
                }
            ];
        });

        it('should overwrite outdated channel when new channel is a different channel', () => {

            const expected = [

                outdated[0],
                {
                    provider_id: 0,
                    provider_channel_id: 9,
                    streamer_name: 'name_3',
                    title: 'title_3',
                    view_count: 15
                }
            ];

            service.refreshChannels(outdated, expected);

            expect(outdated).to.deep.equal(expected);
        });

        it('should update outdated channel details when new channel is same channel', () => {

            const expected = [

                outdated[0],
                {
                    provider_id: outdated[1].provider_id,
                    provider_channel_id: outdated[1].provider_channel_id,
                    streamer_name: 'new_name',
                    title: 'new_title',
                    view_count: outdated[1].view_count + 199
                }
            ];

            service.refreshChannels(outdated, expected);

            expect(outdated).to.deep.equal(expected);
        });

        it('should include all new channels when they are more than total number of outdated channels', () => {

            const expected = [

                outdated[0],
                outdated[1],
                {
                    provider_id: 1,
                    provider_channel_id: 77,
                    streamer_name: 'name_3',
                    title: 'title_3',
                    view_count: 92
                }
            ];

            service.refreshChannels(outdated, expected);

            expect(outdated).to.deep.equal(expected);
        });

        it('should keep outdated channels when they are more than total number of new channels', () => {

            const expected = outdated.slice();
            const updated = outdated.slice(0, 1);

            service.refreshChannels(outdated, updated);

            expect(outdated).to.deep.equal(expected);
        });
    });

    describe('loadFeaturedChannels()', () => {

        it('should use channel http service to fetch data', () => {

            service.loadFeaturedChannels([]);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpStub.getChannels);
        });

        it('should load featured channels', () => {

            const cache = [];
            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            channelHttpStub.getChannels.returns($q.resolve(expected));

            service.loadFeaturedChannels(cache);
            $rootScope.$apply();

            expect(cache).to.deep.equal(expected);
        });

        it('should preserve original channels when failed to fetch featured channel data', () => {

            const cache = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = cache.slice();
            channelHttpStub.getChannels.returns($q.reject(new Error()));

            service.loadFeaturedChannels(cache).catch(() => null);
            $rootScope.$apply();

            expect(cache).to.deep.equal(expected);
        });

        it('should not throw error when failed to fetch featured channel data', () => {

            channelHttpStub.getChannels.returns($q.reject(new Error()));

            service.loadFeaturedChannels([]);
            $rootScope.$apply();
        });
    });

    describe('loadGameChannels()', () => {

        it('should use game http service and channel http service to fetch data', () => {

            const expectedName = 'some game name';
            const expectedId = 17;
            gameHttpStub.getGameByName.returns($q.resolve({ id: expectedId }));

            service.loadGameChannels([], expectedName);
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpStub.getGameByName);
            sinonExpect.calledWith(gameHttpStub.getGameByName, expectedName);
            sinonExpect.calledOnce(channelHttpStub.getChannelsByGameId);
            sinonExpect.calledWith(channelHttpStub.getChannelsByGameId, expectedId);
        });

        it('should load game channels', () => {

            const cache = [];
            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            channelHttpStub.getChannelsByGameId.returns($q.resolve(expected));

            service.loadGameChannels(cache, '');
            $rootScope.$apply();

            expect(cache).to.deep.equal(expected);
        });

        it('should preserve original channels when no game data found', () => {

            const cache = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = cache.slice();
            gameHttpStub.getGameByName.returns($q.resolve(null));

            service.loadGameChannels(cache, '').catch(() => null);
            $rootScope.$apply();

            expect(cache).to.deep.equal(expected);
        });

        it('should preserve original channels when failed to fetch game data', () => {

            const cache = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = cache.slice();
            gameHttpStub.getGameByName.returns($q.reject(new Error()));

            service.loadGameChannels(cache, '').catch(() => null);
            $rootScope.$apply();

            expect(cache).to.deep.equal(expected);
        });

        it('should preserve original channels when failed to fetch game channel data', () => {

            const cache = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = cache.slice();
            channelHttpStub.getChannelsByGameId.returns($q.reject(new Error()));

            service.loadGameChannels(cache, '').catch(() => null);
            $rootScope.$apply();

            expect(cache).to.deep.equal(expected);
        });

        it('should not throw error when failed to fetch game channel data', () => {

            gameHttpStub.getGameByName.returns($q.reject(new Error()));

            service.loadGameChannels([], '');
            $rootScope.$apply();
        });
    });
});

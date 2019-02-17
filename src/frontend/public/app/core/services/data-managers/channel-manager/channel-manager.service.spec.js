import CoreModule from '../../../core.module.ajs';

import { stubChannelHttpServiceNg1 } from '../../../../testing/stubs/custom/channel-http.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('channel manager service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let channelHttpServiceStub;

    beforeEach(module(CoreModule));

    beforeEach('stubs setup', () => {

        channelHttpServiceStub = stubChannelHttpServiceNg1(module, inject);

        channelHttpServiceStub.setupStub();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('channelManagerService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getChannelsByGameId()', () => {

        const id = 76;

        it('should use channel http service to fetch channels', () => {

            service.getChannelsByGameId(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpServiceStub.getChannelsByGameId);
            sinonExpect.calledWith(channelHttpServiceStub.getChannelsByGameId, id);
        });

        it('should return empty collection when no channel is found', () => {

            channelHttpServiceStub.getChannelsByGameId.returns($q.resolve([]));

            service.getChannelsByGameId(id).then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to fetch channels', () => {

            channelHttpServiceStub.getChannelsByGameId.returns($q.reject(new Error()));

            service.getChannelsByGameId(id).then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('refreshChannels()', () => {

        let oldChannels;

        beforeEach('refreshChannels() test setup', () => {

            oldChannels = [

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

        it('should overwrite old channel when new channel is a different channel', () => {

            const expected = [

                oldChannels[0],
                {
                    provider_id: 0,
                    provider_channel_id: 9,
                    streamer_name: 'name_3',
                    title: 'title_3',
                    view_count: 15
                }
            ];

            service.refreshChannels(oldChannels, expected);

            expect(oldChannels).to.deep.equal(expected);
        });

        it('should update old channel details when new channel is same channel', () => {

            const expected = [

                oldChannels[0],
                {
                    provider_id: oldChannels[1].provider_id,
                    provider_channel_id: oldChannels[1].provider_channel_id,
                    streamer_name: 'new_name',
                    title: 'new_title',
                    view_count: oldChannels[1].view_count + 199
                }
            ];

            service.refreshChannels(oldChannels, expected);

            expect(oldChannels).to.deep.equal(expected);
        });

        it('should include all new channels when they are more than total number of old channels', () => {

            const expected = [

                oldChannels[0],
                oldChannels[1],
                {
                    provider_id: 1,
                    provider_channel_id: 77,
                    streamer_name: 'name_3',
                    title: 'title_3',
                    view_count: 92
                }
            ];

            service.refreshChannels(oldChannels, expected);

            expect(oldChannels).to.deep.equal(expected);
        });

        it('should keep old channels when they are more than total number of new channels', () => {

            const expected = oldChannels.slice();
            const newChannels = oldChannels.slice(0, 1);

            service.refreshChannels(oldChannels, newChannels);

            expect(oldChannels).to.deep.equal(expected);
        });
    });
});

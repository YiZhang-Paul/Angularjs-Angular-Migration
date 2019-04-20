import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { ChannelHttpService } from '../../core/services/http/channel-http/channel-http.service';
import { stubChannelHttpService } from '../../testing/stubs/custom/channel-http.service.stub';

import { ChannelService } from './channel.service';

context('channel service unit test', () => {

    let service: ChannelService;

    let channelHttpStub;

    beforeEach('stubs setup', () => {

        channelHttpStub = stubChannelHttpService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                ChannelService,
                { provide: ChannelHttpService, useValue: channelHttpStub }
            ]
        });

        service = TestBed.get(ChannelService);
        channelHttpStub = TestBed.get(ChannelHttpService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(ChannelService);
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

            sinonExpect.calledOnce(channelHttpStub.getChannels);
        });

        it('should load featured channels', fakeAsync(() => {

            const cache = [];
            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            channelHttpStub.getChannels.resolves(expected);

            service.loadFeaturedChannels(cache);
            tick();

            expect(cache).to.deep.equal(expected);
        }));

        it('should preserve original channels when failed to fetch featured channel data', fakeAsync(() => {

            const cache = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = cache.slice();
            channelHttpStub.getChannels.rejects(new Error());

            service.loadFeaturedChannels(cache).catch(() => null);
            tick();

            expect(cache).to.deep.equal(expected);
        }));

        it('should not throw error when failed to fetch featured channel data', fakeAsync(() => {

            channelHttpStub.getChannels.rejects(new Error());

            service.loadFeaturedChannels([]);
            tick();
        }));
    });

    describe('loadGameChannels()', () => {

        it('should use channel http service to fetch channel data', () => {

            const expected = 17;

            service.loadGameChannels([], expected);

            sinonExpect.calledOnce(channelHttpStub.getChannelsByGameId);
            sinonExpect.calledWith(channelHttpStub.getChannelsByGameId, expected);
        });

        it('should load game channels', fakeAsync(() => {

            const cache = [];
            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            channelHttpStub.getChannelsByGameId.resolves(expected);

            service.loadGameChannels(cache, 17);
            tick();

            expect(cache).to.deep.equal(expected);
        }));

        it('should preserve original channels when failed to fetch game channel data', fakeAsync(() => {

            const cache = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = cache.slice();
            channelHttpStub.getChannelsByGameId.rejects(new Error());

            service.loadGameChannels(cache, 17).catch(() => null);
            tick();

            expect(cache).to.deep.equal(expected);
        }));

        it('should not throw error when failed to fetch game channel data', fakeAsync(() => {

            channelHttpStub.getChannelsByGameId.rejects(new Error());

            service.loadGameChannels([], 17);
            tick();
        }));
    });
});

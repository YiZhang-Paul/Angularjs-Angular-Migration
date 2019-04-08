import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { $state } from '../../upgraded-providers/$state-provider/$state-provider';
import { GameHttpService } from '../http/game-http/game-http.service';
import { ChannelHttpService } from '../http/channel-http/channel-http.service';
import { GenericUtilitiesService } from '../utilities/generic-utilities/generic-utilities.service';
import { stub$state } from '../../../testing/stubs/third-party/$state.stub.js';
import { stubGameHttpService } from '../../../testing/stubs/custom/game-http.service.stub';
import { stubChannelHttpService } from '../../../testing/stubs/custom/channel-http.service.stub';
import { stubGenericUtilitiesService } from '../../../testing/stubs/custom/generic-utilities.service.stub';

import { CustomRoutingService } from './custom-routing.service';

context('custom routing service unit test', () => {

    let service: CustomRoutingService;

    let $stateStub;
    let gameHttpStub;
    let channelHttpStub;
    let genericUtilitiesStub;

    beforeEach('stubs setup', () => {

        $stateStub = stub$state();
        gameHttpStub = stubGameHttpService();
        channelHttpStub = stubChannelHttpService();
        genericUtilitiesStub = stubGenericUtilitiesService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                CustomRoutingService,
                { provide: $state, useValue: $stateStub },
                { provide: GameHttpService, useValue: gameHttpStub },
                { provide: ChannelHttpService, useValue: channelHttpStub },
                { provide: GenericUtilitiesService, useValue: genericUtilitiesStub }
            ]
        });

        service = TestBed.get(CustomRoutingService);
        $stateStub = TestBed.get($state);
        gameHttpStub = TestBed.get(GameHttpService);
        channelHttpStub = TestBed.get(ChannelHttpService);
        genericUtilitiesStub = TestBed.get(GenericUtilitiesService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(CustomRoutingService);
    });

    describe('toChannelsView()', () => {

        const id = 17;

        it('should use game http service and channel http service to fetch route data', () => {

            const expected = id;

            service.toChannelsView(id);

            sinonExpect.calledOnce(gameHttpStub.getGame);
            sinonExpect.calledWith(gameHttpStub.getGame, expected);
            sinonExpect.calledOnce(channelHttpStub.getChannelsByGameId);
            sinonExpect.calledWith(channelHttpStub.getChannelsByGameId, expected);
        });

        it('should format game name before route transition', fakeAsync(() => {

            const expected = 'some game name';
            gameHttpStub.getGame.resolves({ name: expected });

            service.toChannelsView(id);
            tick();

            sinonExpect.calledOnce(genericUtilitiesStub.joinText);
            sinonExpect.calledWith(genericUtilitiesStub.joinText, expected);
        }));

        it('should route to correct state along with route data', fakeAsync(() => {

            const game = { id, name: 'name_1' };
            const expectedState = 'index.channels';

            const expectedData = {

                name: 'name_1',
                channels: [{ id: 1 }, { id: 4 }]
            };

            gameHttpStub.getGame.resolves(game);
            channelHttpStub.getChannelsByGameId.resolves(expectedData.channels);
            genericUtilitiesStub.joinText.returns(expectedData.name);

            service.toChannelsView(id);
            tick();

            sinonExpect.calledOnce($stateStub.go);
            sinonExpect.calledWith($stateStub.go, expectedState, expectedData);
        }));

        it('should not throw error when failed to fetch route data', fakeAsync(() => {

            channelHttpStub.getChannelsByGameId.rejects(new Error());

            service.toChannelsView(id);
            tick();
        }));
    });
});
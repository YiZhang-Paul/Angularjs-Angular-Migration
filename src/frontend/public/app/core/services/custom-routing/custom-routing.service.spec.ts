import { TestBed } from '@angular/core/testing';
import { StateService } from '@uirouter/angular';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { GameHttpService } from '../http/game-http/game-http.service';
import { ChannelHttpService } from '../http/channel-http/channel-http.service';
import { GenericUtilitiesService } from '../utilities/generic-utilities/generic-utilities.service';
import { stubStateService } from '../../../testing/stubs/third-party/state.stub';
import { stubGameHttpService } from '../../../testing/stubs/custom/game-http.service.stub';
import { stubChannelHttpService } from '../../../testing/stubs/custom/channel-http.service.stub';
import { stubGenericUtilitiesService } from '../../../testing/stubs/custom/generic-utilities.service.stub';

import { CustomRoutingService } from './custom-routing.service';

context('custom routing service unit test', () => {

    let service: CustomRoutingService;

    let stateStub: any;
    let gameHttpStub: any;
    let channelHttpStub: any;
    let genericUtilitiesStub: any;

    beforeEach('stubs setup', () => {

        stateStub = stubStateService();
        gameHttpStub = stubGameHttpService();
        channelHttpStub = stubChannelHttpService();
        genericUtilitiesStub = stubGenericUtilitiesService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                CustomRoutingService,
                { provide: StateService, useValue: stateStub },
                { provide: GameHttpService, useValue: gameHttpStub },
                { provide: ChannelHttpService, useValue: channelHttpStub },
                { provide: GenericUtilitiesService, useValue: genericUtilitiesStub }
            ]
        });

        service = TestBed.get(CustomRoutingService);
        stateStub = TestBed.get(StateService);
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

        it('should format game name before route transition', async () => {

            const expected = 'some game name';
            gameHttpStub.getGame.resolves({ name: expected });

            await service.toChannelsView(id);

            sinonExpect.calledOnce(genericUtilitiesStub.joinText);
            sinonExpect.calledWith(genericUtilitiesStub.joinText, expected);
        });

        it('should route to correct state along with route data', async () => {

            const game = { id, name: 'name_1' };
            const expectedState = 'channels';

            const expectedData = {

                name: 'name_1',
                channels: [{ id: 1 }, { id: 4 }]
            };

            gameHttpStub.getGame.resolves(game);
            channelHttpStub.getChannelsByGameId.resolves(expectedData.channels);
            genericUtilitiesStub.joinText.returns(expectedData.name);

            await service.toChannelsView(id);

            sinonExpect.calledOnce(stateStub.go);
            sinonExpect.calledWith(stateStub.go, expectedState, expectedData);
        });

        it('should not throw error when failed to fetch route data', async () => {

            channelHttpStub.getChannelsByGameId.rejects(new Error());

            await service.toChannelsView(id);
        });
    });
});

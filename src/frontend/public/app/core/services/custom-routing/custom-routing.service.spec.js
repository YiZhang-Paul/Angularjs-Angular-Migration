import CoreModule from '../../core.module.ajs';

import { stub$stateNg1 } from '../../../testing/stubs/third-party/$state.stub';
import { stubGameHttpServiceNg1 } from '../../../testing/stubs/custom/game-http.service.stub';
import { stubChannelHttpServiceNg1 } from '../../../testing/stubs/custom/channel-http.service.stub';
import { stubGenericUtilitiesServiceNg1 } from '../../../testing/stubs/custom/generic-utilities.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('custom routing service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let $stateStub;
    let gameHttpStub;
    let channelHttpStub;
    let genericUtilitiesStub;

    beforeEach(module(CoreModule));

    beforeEach('stubs setup', () => {

        $stateStub = stub$stateNg1(module, inject);
        gameHttpStub = stubGameHttpServiceNg1(module, inject);
        channelHttpStub = stubChannelHttpServiceNg1(module, inject);
        genericUtilitiesStub = stubGenericUtilitiesServiceNg1(module, inject);

        $stateStub.setupStub();
        gameHttpStub.setupStub();
        channelHttpStub.setupStub();
        genericUtilitiesStub.setupStub();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('customRoutingService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('toChannelsView()', () => {

        const id = 17;

        it('should use game http service and channel http service to fetch route data', () => {

            const expected = id;

            service.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpStub.getGame);
            sinonExpect.calledWith(gameHttpStub.getGame, expected);
            sinonExpect.calledOnce(channelHttpStub.getChannelsByGameId);
            sinonExpect.calledWith(channelHttpStub.getChannelsByGameId, expected);
        });

        it('should format game name before route transition', () => {

            const expected = 'some game name';
            gameHttpStub.getGame.returns($q.resolve({ name: expected }));

            service.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(genericUtilitiesStub.joinText);
            sinonExpect.calledWith(genericUtilitiesStub.joinText, expected);
        });

        it('should route to correct state along with route data', () => {

            const game = { id, name: 'name_1' };
            const expectedState = 'index.channels';

            const expectedData = {

                name: 'name_1',
                channels: [{ id: 1 }, { id: 4 }]
            };

            gameHttpStub.getGame.returns($q.resolve(game));
            channelHttpStub.getChannelsByGameId.returns($q.resolve(expectedData.channels));
            genericUtilitiesStub.joinText.returns(expectedData.name);

            service.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce($stateStub.go);
            sinonExpect.calledWith($stateStub.go, expectedState, expectedData);
        });

        it('should not throw error when failed to fetch route data', () => {

            channelHttpStub.getChannelsByGameId.returns($q.reject(new Error()));

            service.toChannelsView(id);
            $rootScope.$apply();
        });
    });
});

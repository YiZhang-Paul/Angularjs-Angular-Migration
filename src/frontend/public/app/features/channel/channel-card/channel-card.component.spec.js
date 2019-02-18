import SharedModule from '../../../shared/shared.module.ajs';
import ChannelModule from '../channel.module.ajs';

import { stubThumbnailPlayerServiceNg1 } from '../../../testing/stubs/custom/thumbnail-player.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('channel card component unit test', () => {

    const tag = '<channel-card></channel-card>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let thumbnailPlayerStub;

    beforeEach(module(SharedModule));
    beforeEach(module(ChannelModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        thumbnailPlayerStub = stubThumbnailPlayerServiceNg1(module, inject);

        thumbnailPlayerStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('channelCard');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(componentElement.html()).is.not.empty;
    });

    describe('playThumbnail()', () => {

        it('should use thumbnail player service to play thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.playThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(thumbnailPlayerStub.play);
            sinonExpect.calledWith(thumbnailPlayerStub.play, thumbnail);
        });
    });

    describe('stopThumbnail()', () => {

        it('should use thumbnail player service to stop thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.stopThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(thumbnailPlayerStub.stop);
            sinonExpect.calledWith(thumbnailPlayerStub.stop, thumbnail);
        });
    });
});

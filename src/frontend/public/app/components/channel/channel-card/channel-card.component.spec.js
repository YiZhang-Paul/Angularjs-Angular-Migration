import ComponentsModule from '../../components.module';

import { mockThumbnailPlayerService } from '../../../../testing/stubs/thumbnail-player.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('channel card component unit test', () => {

    const tag = '<channel-card></channel-card>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let thumbnailPlayerServiceStub;

    beforeEach(mockModule(ComponentsModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        thumbnailPlayerServiceStub = mockThumbnailPlayerService(mockModule);
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

            sinonExpect.calledOnce(thumbnailPlayerServiceStub.play);
            sinonExpect.calledWith(thumbnailPlayerServiceStub.play, thumbnail);
        });
    });

    describe('stopThumbnail()', () => {

        it('should use thumbnail player service to stop thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.stopThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(thumbnailPlayerServiceStub.stop);
            sinonExpect.calledWith(thumbnailPlayerServiceStub.stop, thumbnail);
        });
    });
});

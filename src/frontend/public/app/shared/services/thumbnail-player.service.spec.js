import SharedModule from '../shared.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('thumbnail player service unit test', () => {

    let thumbnailPlayerService;

    let domElementStub;

    beforeEach(mockModule(SharedModule));

    beforeEach('mocks setup', () => {

        domElementStub = {

            play: stub(),
            pause: stub(),
            currentTime: 55
        };
    });

    beforeEach('general test setup', inject($injector => {

        thumbnailPlayerService = $injector.get('thumbnailPlayerService');
    }));

    it('should resolve', () => {

        expect(thumbnailPlayerService).is.not.null;
    });

    describe('play()', () => {

        it('should play thumbnail', () => {

            thumbnailPlayerService.play({ srcElement: domElementStub });

            sinonExpect.calledOnce(domElementStub.play);
        });
    });

    describe('stop()', () => {

        it('should stop thumbnail', () => {

            thumbnailPlayerService.stop({ srcElement: domElementStub });

            sinonExpect.calledOnce(domElementStub.pause);
        });

        it('should set current play time to 0', () => {

            thumbnailPlayerService.stop({ srcElement: domElementStub });

            expect(domElementStub.currentTime).to.equal(0);
        });
    });
});

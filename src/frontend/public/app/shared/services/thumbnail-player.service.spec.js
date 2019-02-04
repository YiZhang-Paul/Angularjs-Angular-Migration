import SharedModule from '../shared.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('thumbnail player service unit test', () => {

    let service;

    beforeEach(mockModule(SharedModule));

    beforeEach('general test setup', inject($injector => {

        service = $injector.get('thumbnailPlayerService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('play()', () => {

        it('should play thumbnail', () => {

            const domElement = { play: stub() };

            service.play({ srcElement: domElement });

            sinonExpect.calledOnce(domElement.play);
        });
    });

    describe('stop()', () => {

        let domElement;

        beforeEach('stop() test setup', () => {

            domElement = { pause: stub(), currentTime: 55 };
        });

        it('should stop thumbnail', () => {

            service.stop({ srcElement: domElement });

            sinonExpect.calledOnce(domElement.pause);
        });

        it('should set current play time to 0', () => {

            service.stop({ srcElement: domElement });

            expect(domElement.currentTime).to.equal(0);
        });
    });
});

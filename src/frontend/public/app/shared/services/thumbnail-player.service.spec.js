import SharedModule from '../shared.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('thumbnail player service unit test', () => {

    let service;

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

        service = $injector.get('thumbnailPlayerService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('play()', () => {

        it('should play thumbnail', () => {

            service.play({ srcElement: domElementStub });

            sinonExpect.calledOnce(domElementStub.play);
        });
    });

    describe('stop()', () => {

        it('should stop thumbnail', () => {

            service.stop({ srcElement: domElementStub });

            sinonExpect.calledOnce(domElementStub.pause);
        });

        it('should set current play time to 0', () => {

            service.stop({ srcElement: domElementStub });

            expect(domElementStub.currentTime).to.equal(0);
        });
    });
});

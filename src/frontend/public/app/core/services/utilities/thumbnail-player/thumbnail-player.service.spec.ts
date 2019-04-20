import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect, stub } from 'sinon';

import { ThumbnailPlayerService } from './thumbnail-player.service';

context('thumbnail player service unit test', () => {

    let service: ThumbnailPlayerService;

    let domElementStub: any;

    beforeEach('stubs setup', () => {

        domElementStub = {

            play: stub(),
            pause: stub(),
            currentTime: 55
        };
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [ThumbnailPlayerService]
        });

        service = TestBed.get(ThumbnailPlayerService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(ThumbnailPlayerService);
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

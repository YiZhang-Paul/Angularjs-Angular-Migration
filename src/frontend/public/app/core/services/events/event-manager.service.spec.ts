import { TestBed } from '@angular/core/testing';
import { assert as sinonExpect, stub } from 'sinon';
import { expect } from 'chai';

import { EventManagerService } from './event-manager.service';

context('event manager service unit test', () => {

    let service: EventManagerService;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [EventManagerService]
        });

        service = TestBed.get(EventManagerService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(EventManagerService);
    });

    describe('subscribe()', () => {

        it('should invoke callback when subscribed event is fired', () => {

            const event = 'event_1';
            const callback = stub();

            service.subscribe(event, callback);
            service.emit(event, null);

            sinonExpect.calledOnce(callback);
        });

        it('should not invoke callback when non-subscribed event is fired', () => {

            const eventOne = 'event_1';
            const eventTwo = 'event_2';
            const callback = stub();

            service.subscribe(eventOne, callback);
            service.emit(eventTwo, null);

            expect(eventOne).to.not.equal(eventTwo);
            sinonExpect.notCalled(callback);
        });

        it('should invoke callback with correct payload', () => {

            const event = 'event_1';
            const payload = { data: 'random_data' };
            const callback = stub();

            service.subscribe(event, callback);
            service.emit(event, payload);

            sinonExpect.calledWith(callback, payload);
        });
    });
});

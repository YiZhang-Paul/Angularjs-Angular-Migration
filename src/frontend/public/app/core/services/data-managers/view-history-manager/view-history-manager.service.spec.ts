import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { EventManagerService } from '../../../services/events/event-manager.service';
import { ViewHistoryHttpService } from '../../http/view-history-http/view-history-http.service';
import { stubEventManagerService } from '../../../../testing/stubs/custom/event-manager.service.stub';
import { stubViewHistoryHttpService } from '../../../../testing/stubs/custom/view-history-http.service.stub';

import { ViewHistoryManagerService } from './view-history-manager.service';

context('view history manager service unit test', () => {

    let service: ViewHistoryManagerService;

    let eventManagerStub;
    let viewHistoryHttpStub;

    beforeEach('stubs setup', () => {

        eventManagerStub = stubEventManagerService();
        viewHistoryHttpStub = stubViewHistoryHttpService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                ViewHistoryManagerService,
                { provide: EventManagerService, useValue: eventManagerStub },
                { provide: ViewHistoryHttpService, useValue: viewHistoryHttpStub }
            ]
        });

        service = TestBed.get(ViewHistoryManagerService);
        eventManagerStub = TestBed.get(EventManagerService);
        viewHistoryHttpStub = TestBed.get(ViewHistoryHttpService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(ViewHistoryManagerService);
    });

    describe('cacheHistories()', () => {

        it('should use view history http service to fetch view histories', () => {

            service.cacheHistories();

            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should cache view histories', fakeAsync(() => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            viewHistoryHttpStub.getHistories.resolves(expected);

            service.cacheHistories();
            tick();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        }));

        it('should not overwrite cache when no view history found', fakeAsync(() => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.getHistories.resolves([]);

            service.cacheHistories();
            tick();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        }));

        it('should not overwrite cache when failed to get view histories', fakeAsync(() => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.getHistories.rejects(new Error());

            service.cacheHistories();
            tick();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        }));

        it('should raise event when successfully cached view histories', fakeAsync(() => {

            service.cacheHistories();
            tick();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyCached');
        }));
    });

    describe('addHistory()', () => {

        let channel;

        beforeEach('addHistory() test setup', () => {

            channel = { id: 5 };
        });

        it('should use view history http service to add history', () => {

            service.addHistory(channel);

            sinonExpect.calledOnce(viewHistoryHttpStub.addHistory);
            sinonExpect.calledWith(viewHistoryHttpStub.addHistory, channel);
        });

        it('should cache view histories on success', fakeAsync(() => {

            service.addHistory(channel);
            tick();

            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        }));

        it('should raise event when successfully added history', fakeAsync(() => {

            service.addHistory(channel);
            tick();
            // caching view histories will also raise event
            sinonExpect.calledTwice(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyUpdated');
        }));

        it('should not cache view histories on failure', fakeAsync(() => {

            viewHistoryHttpStub.addHistory.rejects(new Error());

            service.addHistory(channel);
            tick();

            sinonExpect.notCalled(viewHistoryHttpStub.getHistories);
        }));

        it('should not raise event when failed to add history', fakeAsync(() => {

            viewHistoryHttpStub.addHistory.rejects(new Error());

            service.addHistory(channel).catch(() => null);
            tick();

            sinonExpect.notCalled(eventManagerStub.emit);
        }));

        it('should not throw error when failed to add history', fakeAsync(() => {

            viewHistoryHttpStub.addHistory.rejects(new Error());

            service.addHistory(channel);
            tick();
        }));
    });

    describe('deleteHistory()', () => {

        const id = 102;

        it('should use view history http service to delete view history', () => {

            service.deleteHistory(id);

            sinonExpect.calledOnce(viewHistoryHttpStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryHttpStub.deleteHistory, id);
        });

        it('should remove cached view history on success', fakeAsync(() => {

            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice(0, -1);

            service.deleteHistory(id);
            tick();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        }));

        it('should raise event when successfully deleted view history', fakeAsync(() => {

            service.deleteHistory(id);
            tick();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyRemoved');
        }));

        it('should not remove cached view history on failure', fakeAsync(() => {

            viewHistoryHttpStub.deleteHistory.rejects(new Error());
            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice();

            service.deleteHistory(id);
            tick();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        }));

        it('should not raise event when failed to delete view history', fakeAsync(() => {

            viewHistoryHttpStub.deleteHistory.rejects(new Error());

            service.deleteHistory(id);
            tick();

            sinonExpect.notCalled(eventManagerStub.emit);
        }));

        it('should not throw error when failed to delete view history', fakeAsync(() => {

            viewHistoryHttpStub.deleteHistory.rejects(new Error());

            service.deleteHistory(id);
            tick();
        }));
    });

    describe('clearHistories()', () => {

        it('should use view history http service to delete view histories', () => {

            service.clearHistories();

            sinonExpect.calledOnce(viewHistoryHttpStub.deleteHistories);
        });

        it('should clear cache on success', fakeAsync(() => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];

            service.clearHistories();
            tick();

            expect(Array.isArray(service.histories)).to.be.true;
            expect(service.histories).to.be.empty;
        }));

        it('should raise event on success', fakeAsync(() => {

            service.clearHistories();
            tick();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyCleared');
        }));

        it('should not clear cache on failure', fakeAsync(() => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.deleteHistories.rejects(new Error());

            service.clearHistories();
            tick();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        }));

        it('should not raise event on failure', fakeAsync(() => {

            viewHistoryHttpStub.deleteHistories.rejects(new Error());

            service.clearHistories();
            tick();

            sinonExpect.notCalled(eventManagerStub.emit);
        }));

        it('should not throw error when failed to delete histories', fakeAsync(() => {

            viewHistoryHttpStub.deleteHistories.rejects(new Error());

            service.clearHistories();
            tick();
        }));
    });
});

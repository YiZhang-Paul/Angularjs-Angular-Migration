import { TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { EventManagerService } from '../../../services/events/event-manager.service';
import { ViewHistoryHttpService } from '../../http/view-history-http/view-history-http.service';
import { stubEventManagerService } from '../../../../testing/stubs/custom/event-manager.service.stub';
import { stubViewHistoryHttpService } from '../../../../testing/stubs/custom/view-history-http.service.stub';

import { ViewHistoryManagerService } from './view-history-manager.service';

context('view history manager service unit test', () => {

    let service: ViewHistoryManagerService;

    let eventManagerStub: any;
    let viewHistoryHttpStub: any;

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

        it('should cache view histories', async () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            viewHistoryHttpStub.getHistories.resolves(expected);

            await service.cacheHistories();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should not overwrite cache when no view history found', async () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.getHistories.resolves([]);

            await service.cacheHistories();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should not overwrite cache when failed to get view histories', async () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.getHistories.rejects(new Error());

            await service.cacheHistories();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should raise event when successfully cached view histories', async () => {

            await service.cacheHistories();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyCached');
        });
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

        it('should cache view histories on success', async () => {

            await service.addHistory(channel);

            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should raise event when successfully added history', async () => {

            await service.addHistory(channel);
            // caching view histories will also raise event
            sinonExpect.calledTwice(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyUpdated');
        });

        it('should not cache view histories on failure', async () => {

            viewHistoryHttpStub.addHistory.rejects(new Error());

            await service.addHistory(channel);

            sinonExpect.notCalled(viewHistoryHttpStub.getHistories);
        });

        it('should not raise event when failed to add history', async () => {

            viewHistoryHttpStub.addHistory.rejects(new Error());

            await service.addHistory(channel).catch(() => null);

            sinonExpect.notCalled(eventManagerStub.emit);
        });

        it('should not throw error when failed to add history', async () => {

            viewHistoryHttpStub.addHistory.rejects(new Error());

            await service.addHistory(channel);
        });
    });

    describe('deleteHistory()', () => {

        const id = 102;

        it('should use view history http service to delete view history', () => {

            service.deleteHistory(id);

            sinonExpect.calledOnce(viewHistoryHttpStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryHttpStub.deleteHistory, id);
        });

        it('should remove cached view history on success', async () => {

            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice(0, -1);

            await service.deleteHistory(id);

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should raise event when successfully deleted view history', async () => {

            await service.deleteHistory(id);

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyRemoved');
        });

        it('should not remove cached view history on failure', async () => {

            viewHistoryHttpStub.deleteHistory.rejects(new Error());
            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice();

            await service.deleteHistory(id);

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete view history', async () => {

            viewHistoryHttpStub.deleteHistory.rejects(new Error());

            await service.deleteHistory(id);

            sinonExpect.notCalled(eventManagerStub.emit);
        });

        it('should not throw error when failed to delete view history', async () => {

            viewHistoryHttpStub.deleteHistory.rejects(new Error());

            await service.deleteHistory(id);
        });
    });

    describe('clearHistories()', () => {

        it('should use view history http service to delete view histories', () => {

            service.clearHistories();

            sinonExpect.calledOnce(viewHistoryHttpStub.deleteHistories);
        });

        it('should clear cache on success', async () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];

            await service.clearHistories();

            expect(Array.isArray(service.histories)).to.be.true;
            expect(service.histories).to.be.empty;
        });

        it('should raise event on success', async () => {

            await service.clearHistories();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'historyCleared');
        });

        it('should not clear cache on failure', async () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.deleteHistories.rejects(new Error());

            await service.clearHistories();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event on failure', async () => {

            viewHistoryHttpStub.deleteHistories.rejects(new Error());

            await service.clearHistories();

            sinonExpect.notCalled(eventManagerStub.emit);
        });

        it('should not throw error when failed to delete histories', async () => {

            viewHistoryHttpStub.deleteHistories.rejects(new Error());

            await service.clearHistories();
        });
    });
});

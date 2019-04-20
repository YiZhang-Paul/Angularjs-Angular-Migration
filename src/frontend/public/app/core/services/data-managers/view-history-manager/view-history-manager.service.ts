import { Injectable } from '@angular/core';

import { ViewHistoryHttpService } from '../../http/view-history-http/view-history-http.service';
import { EventManagerService } from '../../events/event-manager.service';

@Injectable({
    providedIn: 'root'
})
export class ViewHistoryManagerService {

    public histories: any[] = [];

    private _viewHistoryHttp: ViewHistoryHttpService;
    private _eventManager: EventManagerService;

    constructor(

        viewHistoryHttp: ViewHistoryHttpService,
        eventManager: EventManagerService

    ) {

        this._viewHistoryHttp = viewHistoryHttp;
        this._eventManager = eventManager;
    }

    public cacheHistories(): Promise<void> {

        return this._viewHistoryHttp.getHistories().then(histories => {

            this.histories = histories.length ? histories : this.histories;
            this._eventManager.emit('historyCached');
        })
        .catch(error => console.log(error));
    }

    public addHistory(channel: any): Promise<void> {

        return this._viewHistoryHttp.addHistory(channel)
            .then(() => this.cacheHistories())
            .then(() => this._eventManager.emit('historyUpdated'))
            .catch(error => console.log(error));
    }

    private removeCached(id: number): void {

        const index = this.histories.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.histories.splice(index, 1);
        }
    }

    public deleteHistory(id: number): Promise<void> {

        return this._viewHistoryHttp.deleteHistory(id).then(() => {

            this.removeCached(id);
            this._eventManager.emit('historyRemoved');
        })
        .catch(error => console.log(error));
    }

    public clearHistories(): Promise<void> {

        return this._viewHistoryHttp.deleteHistories().then(() => {

            this.histories = [];
            this._eventManager.emit('historyCleared');
        })
        .catch(error => console.log(error));
    }
}

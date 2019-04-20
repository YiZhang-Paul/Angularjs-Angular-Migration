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

    public async cacheHistories(): Promise<void> {

        try {

            const histories = await this._viewHistoryHttp.getHistories();
            this.histories = histories.length ? histories : this.histories;
            this._eventManager.emit('historyCached');
        }
        catch (error) {

            console.log(error);
        }
    }

    public async addHistory(channel: any): Promise<void> {

        try {

            await this._viewHistoryHttp.addHistory(channel);
            this.cacheHistories();
            this._eventManager.emit('historyUpdated');
        }
        catch (error) {

            console.log(error);
        }
    }

    private removeCached(id: number): void {

        const index = this.histories.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.histories.splice(index, 1);
        }
    }

    public async deleteHistory(id: number): Promise<void> {

        try {

            await this._viewHistoryHttp.deleteHistory(id);
            this.removeCached(id);
            this._eventManager.emit('historyRemoved');
        }
        catch (error) {

            console.log(error);
        }
    }

    public async clearHistories(): Promise<void> {

        try {

            await this._viewHistoryHttp.deleteHistories();
            this.histories = [];
            this._eventManager.emit('historyCleared');
        }
        catch (error) {

            console.log(error);
        }
    }
}

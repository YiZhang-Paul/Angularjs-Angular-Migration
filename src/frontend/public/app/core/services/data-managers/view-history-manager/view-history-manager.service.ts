import { Injectable } from '@angular/core';

import { $rootScope } from '../../../upgraded-providers/$rootScope-provider/$rootScope-provider';
import { ViewHistoryHttpService } from '../../http/view-history-http/view-history-http.service';

@Injectable({
    providedIn: 'root'
})
export class ViewHistoryManagerService {

    public histories = [];

    private _$rootScope: $rootScope;
    private _viewHistoryHttp: ViewHistoryHttpService;

    constructor($rootScope: $rootScope, viewHistoryHttp: ViewHistoryHttpService) {

        this._$rootScope = $rootScope;
        this._viewHistoryHttp = viewHistoryHttp;
    }

    public cacheHistories() {

        return this._viewHistoryHttp.getHistories().then(histories => {

            this.histories = histories.length ? histories : this.histories;
            this._$rootScope.$broadcast('historyCached');
        })
        .catch(error => console.log(error));
    }

    public addHistory(channel) {

        return this._viewHistoryHttp.addHistory(channel)
            .then(() => this.cacheHistories())
            .then(() => this._$rootScope.$broadcast('historyUpdated'))
            .catch(error => console.log(error));
    }

    private removeCached(id) {

        const index = this.histories.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.histories.splice(index, 1);
        }
    }

    public deleteHistory(id) {

        this._viewHistoryHttp.deleteHistory(id).then(() => {

            this.removeCached(id);
            this._$rootScope.$broadcast('historyRemoved');
        })
        .catch(error => console.log(error));
    }

    public clearHistories() {

        return this._viewHistoryHttp.deleteHistories().then(() => {

            this.histories = [];
            this._$rootScope.$broadcast('historyCleared');
        })
        .catch(error => console.log(error));
    }
}

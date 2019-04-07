import { Component, OnInit } from '@angular/core';

import { CustomRoutingService } from '../../../core/upgraded-providers/custom-routing-provider/custom-routing-provider';
import { ViewHistoryManager } from '../../../core/upgraded-providers/view-history-manager-provider/view-history-manager-provider';

import { ViewHistoryListService } from './view-history-list.service';

@Component({
    selector: 'view-history-list',
    styles: [`${require('./view-history-list.scss')}`],
    template: require('./view-history-list.html')
})
export class ViewHistoryListComponent implements OnInit {

    private _routingService: CustomRoutingService;
    private _viewHistoryManager: ViewHistoryManager;
    private _viewHistoryListService: ViewHistoryListService;

    constructor(

        routingService: CustomRoutingService,
        viewHistoryManager: ViewHistoryManager,
        viewHistoryListService: ViewHistoryListService

    ) {
        this._routingService = routingService;
        this._viewHistoryManager = viewHistoryManager;
        this._viewHistoryListService = viewHistoryListService;
    }

    get histories(): any {

        return this._viewHistoryManager.histories;
    }

    public ngOnInit(): void {

        this._viewHistoryManager.cacheHistories();
    }

    public isStaticImage(url): any {

        return !/(mp4|m4v)$/i.test(url);
    }

    public toChannelsView(id) {

        this._routingService.toChannelsView(id);
    }

    public deleteHistory(history) {

        this._viewHistoryManager.deleteHistory(history.id);
    }

    public confirmClearHistories(event) {

        this._viewHistoryListService.showClearHistoriesDialog(event).then(() => {

            return this._viewHistoryManager.clearHistories();
        })
        .catch(error => console.log(error));
    }
}

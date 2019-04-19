import { Component, OnInit } from '@angular/core';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

import { ViewHistoryListService } from './view-history-list.service';

@Component({
    selector: 'view-history-list',
    styles: [`${require('./view-history-list.scss')}`],
    template: require('./view-history-list.html')
})
export class ViewHistoryListComponent implements OnInit {

    private _routingService: CustomRoutingService;
    private _viewHistoryManager: ViewHistoryManagerService;
    private _viewHistoryListService: ViewHistoryListService;

    constructor(

        routingService: CustomRoutingService,
        viewHistoryManager: ViewHistoryManagerService,
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

    public confirmClearHistories() {

        this._viewHistoryListService.showClearHistoriesDialog().then(_ => {

            if (_) {

                this._viewHistoryManager.clearHistories();
            }
        });
    }
}

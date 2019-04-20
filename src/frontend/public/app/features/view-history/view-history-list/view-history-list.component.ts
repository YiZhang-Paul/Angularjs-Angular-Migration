import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

import { ClearHistoriesDialog } from './clear-histories-dialog/clear-histories-dialog';

@Component({
    selector: 'view-history-list',
    styles: [`${require('./view-history-list.scss')}`],
    template: require('./view-history-list.html')
})
export class ViewHistoryListComponent implements OnInit {

    private _dialog: MatDialog;
    private _routingService: CustomRoutingService;
    private _viewHistoryManager: ViewHistoryManagerService;

    constructor(

        dialog: MatDialog,
        routingService: CustomRoutingService,
        viewHistoryManager: ViewHistoryManagerService

    ) {

        this._dialog = dialog;
        this._routingService = routingService;
        this._viewHistoryManager = viewHistoryManager;
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

        const width = '25%';
        const dialog = this._dialog.open(ClearHistoriesDialog, { width });

        dialog.afterClosed().toPromise().then(isConfirmed => {

            if (isConfirmed) {

                this._viewHistoryManager.clearHistories();
            }
        });
    }
}

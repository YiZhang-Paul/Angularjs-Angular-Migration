import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

import { ClearHistoriesDialog } from './clear-histories-dialog/clear-histories-dialog';

@Component({
    selector: 'view-history-list',
    styleUrls: ['./view-history-list.scss'],
    templateUrl: './view-history-list.html'
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

    get histories(): any[] {

        return this._viewHistoryManager.histories;
    }

    public ngOnInit(): void {

        this._viewHistoryManager.cacheHistories();
    }

    public isStaticImage(url: string): boolean {

        return !/(mp4|m4v)$/i.test(url);
    }

    public toChannelsView(id: number): void {

        this._routingService.toChannelsView(id);
    }

    public deleteHistory(history: any): void {

        this._viewHistoryManager.deleteHistory(history.id);
    }

    public async confirmClearHistories(): Promise<void> {

        const width = '25%';
        const dialog = this._dialog.open(ClearHistoriesDialog, { width });
        const isConfirmed = await dialog.afterClosed().toPromise();

        if (isConfirmed) {

            this._viewHistoryManager.clearHistories();
        }
    }
}

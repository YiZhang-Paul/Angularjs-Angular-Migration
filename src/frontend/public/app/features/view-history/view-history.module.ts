import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ViewHistoryCardComponent } from './view-history-card/view-history-card.component';
import { ViewHistoryListComponent } from './view-history-list/view-history-list.component';
import { ClearHistoriesDialog } from './view-history-list/clear-histories-dialog/clear-histories-dialog';

@NgModule({
    imports: [SharedModule],
    declarations: [
        ViewHistoryCardComponent,
        ViewHistoryListComponent,
        ClearHistoriesDialog
    ],
    entryComponents: [
        ViewHistoryListComponent,
        ClearHistoriesDialog
    ]
})
export class ViewHistoryModule { }

import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { SharedModule } from '../../shared/shared.module';

import { ViewHistoryCardComponent } from './view-history-card/view-history-card.component';
import { ViewHistoryListComponent } from './view-history-list/view-history-list.component';
import { ViewHistoryListService } from './view-history-list/view-history-list.service';
import * as ViewHistoryModuleAjs from './view-history.module.ajs.js';

@NgModule({
    imports: [SharedModule],
    providers: [ViewHistoryListService],
    declarations: [
        ViewHistoryCardComponent,
        ViewHistoryListComponent
    ],
    entryComponents: [
        ViewHistoryCardComponent,
        ViewHistoryListComponent
    ]
})
export class ViewHistoryModule { }

angular.module(ViewHistoryModuleAjs.default)
    .directive('viewHistoryCard', downgradeComponent({ component: ViewHistoryCardComponent }))
    .directive('viewHistoryList', downgradeComponent({ component: ViewHistoryListComponent }));

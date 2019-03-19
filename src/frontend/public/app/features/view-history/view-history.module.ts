import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { SharedModule } from '../../shared/shared.module';

import { ViewHistoryCardComponent } from './view-history-card/view-history-card.component';
import * as ViewHistoryModuleAjs from './view-history.module.ajs.js';

@NgModule({
    imports: [SharedModule],
    declarations: [ViewHistoryCardComponent],
    entryComponents: [ViewHistoryCardComponent]
})
export class ViewHistoryModule { }

angular.module(ViewHistoryModuleAjs.default)
    .directive('viewHistoryCard', downgradeComponent({ component: ViewHistoryCardComponent }));

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';
import { downgradeComponent, UpgradeModule } from '@angular/upgrade/static';
import * as angular from 'angular';

import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { config, states } from './app.route';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error.component';
import * as AppModuleAjs from './app.module.ajs.js';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        UIRouterModule.forRoot({ states, useHash: false, config }),
        CoreModule,
        FeaturesModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        ErrorComponent
    ],
    entryComponents: [AppComponent]
})
export class AppModule {

    private _upgrade: UpgradeModule;

    constructor(upgrade: UpgradeModule) {

        this._upgrade = upgrade;
    }

    public ngDoBootstrap(): void {

        this._upgrade.bootstrap(document.body, [AppModuleAjs.default]);
    }
}

angular.module(AppModuleAjs.default)
    .directive('app', downgradeComponent({ component: AppComponent }));

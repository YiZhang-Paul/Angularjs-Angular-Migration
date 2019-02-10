import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';

import './app.module.ajs.js';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        UIRouterUpgradeModule.forRoot(),
        ComponentsModule,
        SharedModule
    ]
})
export class AppModule {

    private _upgrade: UpgradeModule;

    constructor(upgrade: UpgradeModule) {

        this._upgrade = upgrade;
    }

    public ngDoBootstrap(): void {

        this._upgrade.bootstrap(document.body, ['migration-sample-app']);
    }
}

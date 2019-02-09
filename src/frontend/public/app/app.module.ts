import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import './app.module.js';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
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

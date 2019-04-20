import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from '@uirouter/angular';

import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { routeSetup } from './app.route';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error.component';

@NgModule({
    imports: [
        BrowserModule,
        UIRouterModule.forRoot(routeSetup),
        CoreModule,
        FeaturesModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        ErrorComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

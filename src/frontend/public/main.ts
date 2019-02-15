import 'zone.js';
import 'reflect-metadata';
import { NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UIRouter, UrlService } from '@uirouter/core';

import { AppModule } from './app/app.module';
import { app as AppModuleAjs } from './app/app.module.ajs';

AppModuleAjs.config(['$urlServiceProvider', ($urlService: UrlService) => {

    $urlService.deferIntercept();
}]);

platformBrowserDynamic().bootstrapModule(AppModule).then(platform => {

    const injector = platform.injector;
    const urlService: UrlService = injector.get(UIRouter).urlService;
    const ngZone: NgZone = injector.get(NgZone);

    ngZone.run(() => {

        urlService.listen();
        urlService.sync();
    });
});

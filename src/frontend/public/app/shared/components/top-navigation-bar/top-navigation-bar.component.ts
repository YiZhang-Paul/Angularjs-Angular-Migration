import { Component } from '@angular/core';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';

@Component({
    selector: 'top-navigation-bar',
    styles: [`${require('./top-navigation-bar.scss')}`],
    template: require('./top-navigation-bar.html')
})
export class TopNavigationBarComponent {

    private _routingService: CustomRoutingService;

    constructor(routingService: CustomRoutingService) {

        this._routingService = routingService;
    }

    public toMainPage() {

        this._routingService.toState('index');
    }
}

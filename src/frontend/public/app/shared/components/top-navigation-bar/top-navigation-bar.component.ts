import { Component } from '@angular/core';

import { CustomRoutingService } from '../../../core/upgraded-providers/custom-routing-provider/custom-routing-provider';

@Component({
    selector: 'top-navigation-bar',
    styles: [`${require('./top-navigation-bar.scss')}`],
    template: require('./top-navigation-bar.html')
})
export class TopNavigationBarComponent {

    private _customRoutingService: CustomRoutingService;

    constructor(customRoutingService: CustomRoutingService) {

        this._customRoutingService = customRoutingService;
    }

    public toMainPage() {

        this._customRoutingService.toState('index');
    }
}

import { Component } from '@angular/core';

import { CustomRoutingService } from '../../../core/upgraded-providers/custom-routing-provider/custom-routing-provider';

@Component({
    selector: 'dropdown-search-box',
    styles: [`${require('./dropdown-search-box.scss')}`],
    template: require('./dropdown-search-box.html')
})
export class DropdownSearchBoxComponent {

    public result: any = null;

    private _routingService: CustomRoutingService;

    constructor(routingService: CustomRoutingService) {

        this._routingService = routingService;
    }

    public toChannelsView(game) {

        this._routingService.toChannelsView(game.id);
        this.result = null;
    }
}

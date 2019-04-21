import { Component } from '@angular/core';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';

@Component({
    selector: 'dropdown-search-box',
    styleUrls: ['./dropdown-search-box.scss'],
    templateUrl: './dropdown-search-box.html'
})
export class DropdownSearchBoxComponent {

    public result: { games: any[] } = null;

    private _routingService: CustomRoutingService;

    constructor(routingService: CustomRoutingService) {

        this._routingService = routingService;
    }

    public toChannelsView(game: any): void {

        this._routingService.toChannelsView(game.id);
        this.result = null;
    }
}

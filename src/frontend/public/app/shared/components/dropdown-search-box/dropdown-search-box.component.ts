import { Component } from '@angular/core';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';

@Component({
    selector: 'dropdown-search-box',
    styleUrls: ['./dropdown-search-box.scss'],
    templateUrl: './dropdown-search-box.html'
})
export class DropdownSearchBoxComponent {

    public result: { games: any[] } = null;

    constructor(private _routingService: CustomRoutingService) { }

    public toChannelsView(game: any): void {

        this._routingService.toChannelsView(game.id);
        this.result = null;
    }
}

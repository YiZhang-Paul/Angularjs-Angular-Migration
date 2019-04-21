import { Component, Input } from '@angular/core';

import { CustomRoutingService } from '../../../../core/services/custom-routing/custom-routing.service';

@Component({
    selector: 'sidebar-badge',
    styleUrls: ['./sidebar-badge.scss'],
    templateUrl: './sidebar-badge.html'
})
export class SidebarBadgeComponent {

    @Input() public channelBadges: any[];
    @Input() public route: string;

    private _routingService: CustomRoutingService;

    constructor(routingService: CustomRoutingService) {

        this._routingService = routingService;
    }

    public toState(): void {

        this._routingService.toState(this.route);
    }
}

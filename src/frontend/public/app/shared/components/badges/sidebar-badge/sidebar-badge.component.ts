import { Component, Input } from '@angular/core';

import { CustomRoutingService } from '../../../../core/services/custom-routing/custom-routing.service';

@Component({
    selector: 'sidebar-badge',
    styles: [`${require('./sidebar-badge.scss')}`],
    template: require('./sidebar-badge.html')
})
export class SidebarBadgeComponent {

    @Input() public channelBadges: any;
    @Input() public route: any;

    private _routingService: CustomRoutingService;

    constructor(routingService: CustomRoutingService) {

        this._routingService = routingService;
    }

    public toState() {

        this._routingService.toState(this.route);
    }
}

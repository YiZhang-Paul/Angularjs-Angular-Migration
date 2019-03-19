import { Component, Input } from '@angular/core';

import { CustomRoutingService } from '../../../../core/upgraded-providers/custom-routing-provider/custom-routing-provider';

@Component({
    selector: 'sidebar-badge',
    styles: [`${require('./sidebar-badge.scss')}`],
    template: require('./sidebar-badge.html')
})
export class SidebarBadgeComponent {

    @Input() public channelBadges: any;
    @Input() public route: any;

    private _customRouting: CustomRoutingService;

    constructor(customRouting: CustomRoutingService) {

        this._customRouting = customRouting;
    }

    public toState() {

        this._customRouting.toState(this.route);
    }
}

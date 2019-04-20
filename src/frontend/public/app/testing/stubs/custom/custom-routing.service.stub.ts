import { stub } from 'sinon';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';

export function stubCustomRoutingService() {

    const stubbed = {} as CustomRoutingService;

    stubbed.toChannelsView = stub();

    return stubbed;
}

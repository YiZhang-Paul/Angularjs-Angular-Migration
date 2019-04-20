import { stub } from 'sinon';

import { EventManagerService } from '../../../core/services/events/event-manager.service';

export function stubEventManagerService() {

    const stubbed = {} as EventManagerService;

    stubbed.emit = stub();
    stubbed.subscribe = stub();

    return stubbed;
}

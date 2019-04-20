import { stub } from 'sinon';

import { GenericUtilitiesService } from '../../../core/services/utilities/generic-utilities/generic-utilities.service';

export function stubGenericUtilitiesService() {

    const stubbed = {} as GenericUtilitiesService;

    stubbed.joinText = stub().returns('');
    stubbed.excludeIndex = stub().returns([]);
    stubbed.hasMatchingValues = stub().returns(true);
    stubbed.hasOwnProperties = stub().returns(true);
    stubbed.findByProperties = stub().returns({});

    return stubbed;
}

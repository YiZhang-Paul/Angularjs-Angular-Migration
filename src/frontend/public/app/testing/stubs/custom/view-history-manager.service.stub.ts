import { stub } from 'sinon';

import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

export function stubViewHistoryManagerService() {

    const stubbed = {} as ViewHistoryManagerService;

    stubbed.cacheHistories = stub().resolves({});
    stubbed.addHistory = stub().resolves({});
    stubbed.deleteHistory = stub().resolves({});
    stubbed.clearHistories = stub().resolves({});

    return stubbed;
}

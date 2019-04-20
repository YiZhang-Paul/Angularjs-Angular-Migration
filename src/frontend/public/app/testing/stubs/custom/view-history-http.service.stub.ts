import { stub } from 'sinon';

import { ViewHistoryHttpService } from '../../../core/services/http/view-history-http/view-history-http.service';

export function stubViewHistoryHttpService() {

    const stubbed = {} as ViewHistoryHttpService;

    stubbed.getHistories = stub().resolves([]);
    stubbed.addHistory = stub().resolves({});
    stubbed.deleteHistory = stub().resolves({});
    stubbed.deleteHistories = stub().resolves({});

    return stubbed;
}

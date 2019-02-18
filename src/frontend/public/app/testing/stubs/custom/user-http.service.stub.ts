import { stub } from 'sinon';

import { UserHttpService } from '../../../core/services/http/user-http/user-http.service';

export function stubUserHttpService() {

    const stubbed = {} as UserHttpService;

    stubbed.getUser = stub().returns(Promise.resolve({}));

    return stubbed;
}

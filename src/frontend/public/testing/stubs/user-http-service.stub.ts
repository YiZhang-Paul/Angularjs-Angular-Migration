import { stub } from 'sinon';

import { UserHttpService } from '../../app/shared/services/user-http.service';

export function mockUserHttpService() {

    const mock = {} as UserHttpService;

    mock.getUser = stub().returns(Promise.resolve({}));

    return mock;
}

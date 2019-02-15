import { stub } from 'sinon';

import { LoginService } from '../../app/components/login/login.service';

export function mockLoginService() {

    const mock = {} as LoginService;

    mock.login = stub().returns(Promise.resolve({}));
    mock.logout = stub();
    mock.openLoginPanel = stub().returns(Promise.resolve({}));

    return mock;
}

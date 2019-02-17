import { stub } from 'sinon';

import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';

export function stubUserLoginService() {

    const stubbed = {} as UserLoginService;

    stubbed.login = stub().returns(Promise.resolve({}));
    stubbed.logout = stub();

    return stubbed;
}

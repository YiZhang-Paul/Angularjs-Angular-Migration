import { stub } from 'sinon';

import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';

export function stubAuthenticatorService() {

    const option = { headers: { Authorization: 'bearer xxx.xxxx.xxx' } };

    const stubbed = {

        get defaultOptions() { return option; },
        get isAuthenticated() { return true; }

    } as AuthenticatorService;

    stubbed.requestToken = stub().resolves({});
    stubbed.clearToken = stub();

    return stubbed;
}

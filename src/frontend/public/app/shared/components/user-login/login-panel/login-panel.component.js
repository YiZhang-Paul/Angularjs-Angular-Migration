import './login-panel.scss';

export class LoginPanelController {

    constructor(mdPanelRef) {
        'ngInject';
        this.mdPanelRef = mdPanelRef;

        this.username = '';
        this.password = '';
        this.noError = true;
    }

    onKeyup($event) {

        if ($event.keyCode === 13) {

            this.onLogin();
        }
    }

    onLogin() {

        const data = { username: this.username, password: this.password };

        this.loginCallback(data)
            .then(() => this.mdPanelRef.close())
            .then(() => this.mdPanelRef.destroy())
            .catch(() => this.noError = false);
    }
}

export const LoginPanelComponent = {

    templateUrl: 'app/shared/components/user-login/login-panel/login-panel.html',
    controller: LoginPanelController
};

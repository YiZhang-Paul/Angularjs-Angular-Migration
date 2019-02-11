import './login-panel.css';

export class LoginPanel {

    constructor(mdPanelRef) {
        'ngInject';
        this.panel = mdPanelRef;

        this.username = '';
        this.password = '';
    }

    onKeyup($event) {

        if ($event.keyCode === 13) {

            this.onLogin();
        }
    }

    onLogin() {

        const data = { username: this.username, password: this.password };

        this.loginCallback(data)
            .then(() => this.panel.close())
            .then(() => this.panel.destroy())
            .catch(error => console.log(error));
    }
}

export const LoginPanelComponent = {

    templateUrl: 'app/components/login/login-panel/login-panel.html',
    controller: LoginPanel
};

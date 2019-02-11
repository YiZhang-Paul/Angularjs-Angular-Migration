import { LoginPanelComponent } from './login-panel/login-panel.component';

export class LoginService {

    constructor($mdPanel) {
        'ngInject';
        this.$mdPanel = $mdPanel;
    }

    openLoginPanel(loginCallback) {

        const position = this.$mdPanel.newPanelPosition();

        return this.$mdPanel.open({

            locals: { loginCallback },
            controller: LoginPanelComponent.controller,
            controllerAs: '$ctrl',
            templateUrl: LoginPanelComponent.templateUrl,
            panelClass: 'login-panel-container',
            position: position.absolute().center(),
            zIndex: 150,
            attachTo: angular.element(document.body),
            disableParentScroll: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            focusOnOpen: true,
            trapFocus: true
        });
    }
}

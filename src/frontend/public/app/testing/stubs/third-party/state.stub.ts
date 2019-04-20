import { StateService } from '@uirouter/angular';
import { stub } from 'sinon';

export function stubStateService() {

    const stubbed = {} as StateService;

    stubbed.go = stub();

    return stubbed;
}

import { Transition } from '@uirouter/angular';
import { stub } from 'sinon';

export function stubTransition() {

    const stubbed = {} as Transition;

    stubbed.params = stub().returns({});

    return stubbed;
}

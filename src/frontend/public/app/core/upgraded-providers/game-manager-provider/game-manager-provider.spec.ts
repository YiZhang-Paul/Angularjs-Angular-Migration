import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';
import { stubGameHttpServiceNg1 } from '../../../testing/stubs/custom/game-http.service.stub.js';

import { gameManagerFactory } from './game-manager-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('game manager service upgraded provider unit test', () => {

    beforeEach(module(CoreModule.default));

    beforeEach('stubs setup', () => {

        stubGameHttpServiceNg1(module, inject);
    });

    it('should resolve', inject($injector => {

        const service = gameManagerFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('gameManagerService'));
    }));
});

import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';

import { gameHttpFactory } from './game-http-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('game http service upgraded provider unit test', () => {

    beforeEach(module(CoreModule.default));

    it('should resolve', inject($injector => {

        const service = gameHttpFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('gameHttpService'));
    }));
});

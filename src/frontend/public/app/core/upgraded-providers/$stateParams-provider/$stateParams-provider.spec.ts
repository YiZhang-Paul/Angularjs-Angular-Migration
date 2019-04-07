import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';

import { $stateParamsFactory } from './$stateParams-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('$stateParams service upgraded provider unit test', () => {

    beforeEach(module('ui.router'));
    beforeEach(module(CoreModule.default));

    it('should resolve', inject($injector => {

        const service = $stateParamsFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('$stateParams'));
    }));
});

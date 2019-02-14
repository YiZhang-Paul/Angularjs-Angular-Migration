import * as angular from 'angular';
import { expect } from 'chai';

import * as SharedModule from '../shared.module.ajs';

import { authenticatorFactory } from './authenticator.provider';

const inject = angular.mock.inject;
const mockModule = angular.mock.module;

context('authenticator service upgraded provider unit test', () => {

    beforeEach(mockModule(SharedModule.default));

    it('should resolve', inject($injector => {

        const service = authenticatorFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('authenticatorService'));
    }));
});

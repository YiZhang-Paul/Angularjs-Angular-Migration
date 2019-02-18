import * as angular from 'angular';
import { expect } from 'chai';

import { $rootScopeFactory } from './$rootScope-provider';

const inject = angular.mock.inject;

context('$rootScope service upgraded provider unit test', () => {

    it('should resolve', inject($injector => {

        const service = $rootScopeFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('$rootScope'));
    }));
});

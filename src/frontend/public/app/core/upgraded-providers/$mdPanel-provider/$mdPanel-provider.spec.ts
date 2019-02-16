import * as angular from 'angular';
import { expect } from 'chai';

import { $mdPanelFactory } from './$mdPanel-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('$mdPanel service upgraded provider unit test', () => {

    beforeEach(module('ngMaterial'));

    it('should resolve', inject($injector => {

        const service = $mdPanelFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('$mdPanel'));
    }));
});

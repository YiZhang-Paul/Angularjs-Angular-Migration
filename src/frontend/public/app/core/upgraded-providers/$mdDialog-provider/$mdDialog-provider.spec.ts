import * as angular from 'angular';
import { expect } from 'chai';

import { $mdDialogFactory } from './$mdDialog-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('$mdDialog service upgraded provider unit test', () => {

    beforeEach(module('ngMaterial'));

    it('should resolve', inject($injector => {

        const service = $mdDialogFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('$mdDialog'));
    }));
});

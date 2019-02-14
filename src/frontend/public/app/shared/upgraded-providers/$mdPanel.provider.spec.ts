import * as angular from 'angular';
import { expect } from 'chai';

import { $mdPanelFactory } from './$mdPanel.provider';

const inject = angular.mock.inject;
const mockModule = angular.mock.module;

context('$mdPanel service upgraded provider unit test', () => {

    beforeEach(mockModule('ngMaterial'));

    it('should resolve', inject($injector => {

        const service = $mdPanelFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('$mdPanel'));
    }));
});

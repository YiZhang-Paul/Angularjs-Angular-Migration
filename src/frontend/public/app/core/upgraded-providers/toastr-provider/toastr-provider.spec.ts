import * as angular from 'angular';
import { expect } from 'chai';

import { toastrFactory } from './toastr-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('toastr service upgraded provider unit test', () => {

    beforeEach(module('toastr'));

    it('should resolve', inject($injector => {

        const service = toastrFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('toastr'));
    }));
});

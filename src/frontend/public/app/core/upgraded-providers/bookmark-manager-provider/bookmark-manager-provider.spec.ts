import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';

import { bookmarkManagerFactory } from './bookmark-manager-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('bookmark manager service upgraded provider unit test', () => {

    beforeEach(module(CoreModule.default));

    it('should resolve', inject($injector => {

        const service = bookmarkManagerFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('bookmarkManagerService'));
    }));
});

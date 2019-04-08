import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';
import * as SharedModule from '../../../shared/shared.module.ajs';
import { stubAuthenticatorServiceNg1 } from '../../../testing/stubs/custom/authenticator.service.stub.js';
import { stubBookmarkHttpServiceNg1 } from '../../../testing/stubs/custom/bookmark-http.service.stub.js';

import { bookmarkManagerFactory } from './bookmark-manager-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('bookmark manager service upgraded provider unit test', () => {

    beforeEach(module(CoreModule.default));
    beforeEach(module(SharedModule.default));

    beforeEach('stubs setup', () => {

        stubAuthenticatorServiceNg1(module, inject);
        stubBookmarkHttpServiceNg1(module, inject);
    });

    it('should resolve', inject($injector => {

        const service = bookmarkManagerFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('bookmarkManagerService'));
    }));
});

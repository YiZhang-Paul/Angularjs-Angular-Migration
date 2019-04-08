import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';
import { stub$stateNg1 } from '../../../testing/stubs/third-party/$state.stub.js';
import { stubChannelHttpServiceNg1 } from '../../../testing/stubs/custom/channel-http.service.stub.js';
import { stubGameHttpServiceNg1 } from '../../../testing/stubs/custom/game-http.service.stub.js';
import { stubGenericUtilitiesServiceNg1 } from '../../../testing/stubs/custom/generic-utilities.service.stub.js';

import { customRoutingServiceFactory } from './custom-routing-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('custom routing service upgraded provider unit test', () => {

    beforeEach(module(CoreModule.default));

    beforeEach('stubs setup', () => {

        stub$stateNg1(module, inject);
        stubChannelHttpServiceNg1(module, inject);
        stubGameHttpServiceNg1(module, inject);
        stubGenericUtilitiesServiceNg1(module, inject);
    });

    it('should resolve', inject($injector => {

        const service = customRoutingServiceFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('customRoutingService'));
    }));
});

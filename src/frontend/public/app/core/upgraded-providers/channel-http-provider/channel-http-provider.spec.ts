import * as angular from 'angular';
import { expect } from 'chai';

import * as CoreModule from '../../core.module.ajs';

import { channelHttpFactory } from './channel-http-provider';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('channel http service upgraded provider unit test', () => {

    beforeEach(module(CoreModule.default));

    it('should resolve', inject($injector => {

        const service = channelHttpFactory($injector);

        expect(service).is.not.null;
        expect(service).to.deep.equal($injector.get('channelHttpService'));
    }));
});

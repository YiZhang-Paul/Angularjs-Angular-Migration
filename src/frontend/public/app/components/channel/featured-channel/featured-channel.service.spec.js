import ComponentsModule from '../../components.module';

import { mockChannelHttpService } from '../../../../testing/stubs/channel-http.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('featured channel service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let channelHttpServiceStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        channelHttpServiceStub = mockChannelHttpService(mockModule, inject);

        channelHttpServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('featuredChannelService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getFeaturedChannels()', () => {

        it('should use channel http service to fetch data', () => {

            service.getFeaturedChannels();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpServiceStub.getChannels);
        });

        it('should return channels found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            channelHttpServiceStub.getChannels.returns($q.resolve(expected));

            service.getFeaturedChannels().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no channel found', () => {

            channelHttpServiceStub.getChannels.returns($q.resolve([]));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve channels', () => {

            channelHttpServiceStub.getChannels.returns($q.reject(new Error()));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });
});

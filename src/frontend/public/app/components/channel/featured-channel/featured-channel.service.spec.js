import ComponentsModule from '../../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('featured channel service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let getChannelsStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock channel http service setup', mockModule($provide => {

        getChannelsStub = stub();

        $provide.service('channelHttpService', () => ({

            getChannels: getChannelsStub
        }));
    }));

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

            getChannelsStub.returns($q.resolve([]));

            service.getFeaturedChannels();
            $rootScope.$apply();

            sinonExpect.calledOnce(getChannelsStub);
        });

        it('should return channels found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            getChannelsStub.returns($q.resolve(expected));

            service.getFeaturedChannels().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no channel found', () => {

            getChannelsStub.returns($q.resolve([]));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve channels', () => {

            getChannelsStub.returns($q.reject(new Error()));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });
});

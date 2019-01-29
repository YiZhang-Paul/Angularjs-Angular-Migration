import SharedModule from '../shared.module';

const mockModule = angular.mock.module;

context('capitalize filter unit test', () => {

    beforeEach(mockModule(SharedModule));

    describe('capitalize()', () => {

        let filter;

        beforeEach('test setup', inject($filter => {

            filter = $filter('capitalize');
        }));

        it('should resolve', () => {

            expect(filter).is.not.null;
        });
    });
});

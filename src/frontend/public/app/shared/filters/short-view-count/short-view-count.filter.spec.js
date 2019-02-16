import SharedModule from '../../shared.module.ajs';

const module = angular.mock.module;

context('short view count filter unit test', () => {

    let filter;

    beforeEach(module(SharedModule));

    beforeEach('general test setup', inject($filter => {

        filter = $filter('shortViewCount');
    }));

    it('should resolve', () => {

        expect(filter).is.not.null;
    });

    describe('shortViewCount()', () => {

        it('should return same number when number is smaller than 1000', () => {

            const expected = 999;

            expect(filter(+expected)).to.equal(expected);
        });

        it('should append letter k and add comma separator when applicable', () => {

            const expected = '1,115,123.9k';

            expect(filter(1115123868)).to.equal(expected);
        });
    });
});

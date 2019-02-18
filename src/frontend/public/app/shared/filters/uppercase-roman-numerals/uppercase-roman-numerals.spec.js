import SharedModule from '../../shared.module.ajs';

const module = angular.mock.module;

context('uppercase roman numerals filter unit test', () => {

    let filter;

    beforeEach(module(SharedModule));

    beforeEach('general test setup', inject($filter => {

        filter = $filter('uppercaseRomanNumerals');
    }));

    it('should resolve', () => {

        expect(filter).is.not.null;
    });

    describe('uppercaseRomanNumerals()', () => {

        it('should return empty string when input is null', () => {

            expect(filter(null)).to.equal('');
        });

        it('should return empty string when input is undefined', () => {

            expect(filter(undefined)).to.equal('');
        });

        it('should return empty string when input contains spaces only', () => {

            const input = ''.repeat(10);

            expect(filter(input)).to.equal('');
        });

        it('1 ~ 3', () => {

            expect(filter('ax i biv')).to.equal('ax I biv');
            expect(filter('ax ii biv')).to.equal('ax II biv');
            expect(filter('ax iii biv')).to.equal('ax III biv');
        });

        it('4 ~ 8', () => {

            expect(filter('ax iv biv')).to.equal('ax IV biv');
            expect(filter('ax v biv')).to.equal('ax V biv');
            expect(filter('ax vi biv')).to.equal('ax VI biv');
            expect(filter('ax vii biv')).to.equal('ax VII biv');
            expect(filter('ax viii biv')).to.equal('ax VIII biv');
        });

        it('9 ~ 13', () => {

            expect(filter('ax ix biv')).to.equal('ax IX biv');
            expect(filter('ax x biv')).to.equal('ax X biv');
            expect(filter('ax xi biv')).to.equal('ax XI biv');
            expect(filter('ax Xii biv')).to.equal('ax XII biv');
            expect(filter('ax xiii biv')).to.equal('ax XIII biv');
        });

        it('14 ~ 18', () => {

            expect(filter('ax xiv biv')).to.equal('ax XIV biv');
            expect(filter('ax xv biv')).to.equal('ax XV biv');
            expect(filter('ax xvi biv')).to.equal('ax XVI biv');
            expect(filter('ax xvii biv')).to.equal('ax XVII biv');
            expect(filter('ax xviii biv')).to.equal('ax XVIII biv');
        });

        it('19 ~ 23', () => {

            expect(filter('ax xix biv')).to.equal('ax XIX biv');
            expect(filter('ax xx biv')).to.equal('ax XX biv');
            expect(filter('ax xxi biv')).to.equal('ax XXI biv');
            expect(filter('ax xxii biv')).to.equal('ax XXII biv');
            expect(filter('ax xxiii biv')).to.equal('ax XXIII biv');
        });
    });
});

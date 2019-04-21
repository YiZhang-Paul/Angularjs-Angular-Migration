import { expect } from 'chai';

import { UppercaseRomanNumeralsPipe } from './uppercase-roman-numerals.pipe';

context('uppercase roman numerals pipe unit test', () => {

    let pipe: UppercaseRomanNumeralsPipe;

    beforeEach('general test setup', () => {

        pipe = new UppercaseRomanNumeralsPipe();
    });

    describe('transform()', () => {

        it('should return empty string when input is null', () => {

            expect(pipe.transform(null)).to.equal('');
        });

        it('should return empty string when input is undefined', () => {

            expect(pipe.transform(undefined)).to.equal('');
        });

        it('should return empty string when input contains spaces only', () => {

            const input = ''.repeat(10);

            expect(pipe.transform(input)).to.equal('');
        });

        it('1 ~ 3', () => {

            expect(pipe.transform('ax i biv')).to.equal('ax I biv');
            expect(pipe.transform('ax ii biv')).to.equal('ax II biv');
            expect(pipe.transform('ax iii biv')).to.equal('ax III biv');
        });

        it('4 ~ 8', () => {

            expect(pipe.transform('ax iv biv')).to.equal('ax IV biv');
            expect(pipe.transform('ax v biv')).to.equal('ax V biv');
            expect(pipe.transform('ax vi biv')).to.equal('ax VI biv');
            expect(pipe.transform('ax vii biv')).to.equal('ax VII biv');
            expect(pipe.transform('ax viii biv')).to.equal('ax VIII biv');
        });

        it('9 ~ 13', () => {

            expect(pipe.transform('ax ix biv')).to.equal('ax IX biv');
            expect(pipe.transform('ax x biv')).to.equal('ax X biv');
            expect(pipe.transform('ax xi biv')).to.equal('ax XI biv');
            expect(pipe.transform('ax Xii biv')).to.equal('ax XII biv');
            expect(pipe.transform('ax xiii biv')).to.equal('ax XIII biv');
        });

        it('14 ~ 18', () => {

            expect(pipe.transform('ax xiv biv')).to.equal('ax XIV biv');
            expect(pipe.transform('ax xv biv')).to.equal('ax XV biv');
            expect(pipe.transform('ax xvi biv')).to.equal('ax XVI biv');
            expect(pipe.transform('ax xvii biv')).to.equal('ax XVII biv');
            expect(pipe.transform('ax xviii biv')).to.equal('ax XVIII biv');
        });

        it('19 ~ 23', () => {

            expect(pipe.transform('ax xix biv')).to.equal('ax XIX biv');
            expect(pipe.transform('ax xx biv')).to.equal('ax XX biv');
            expect(pipe.transform('ax xxi biv')).to.equal('ax XXI biv');
            expect(pipe.transform('ax xxii biv')).to.equal('ax XXII biv');
            expect(pipe.transform('ax xxiii biv')).to.equal('ax XXIII biv');
        });
    });
});

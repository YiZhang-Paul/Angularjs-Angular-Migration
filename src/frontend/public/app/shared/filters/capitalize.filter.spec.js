import SharedModule from '../shared.module';

const mockModule = angular.mock.module;

context('capitalize filter unit test', () => {

    let filter;

    beforeEach(mockModule(SharedModule));

    beforeEach('general test setup', inject($filter => {

        filter = $filter('capitalize');
    }));

    it('should resolve', () => {

        expect(filter).is.not.null;
    });

    describe('capitalize()', () => {

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

        it('should capitalize single word from input', () => {

            const input = 'word';
            const expected = 'Word';

            expect(filter(input)).to.equal(expected);
        });

        it('should capitalize every word from input', () => {

            const input = 'more than one words.';
            const expected = 'More Than One Words.';

            expect(filter(input)).to.equal(expected);
        });

        it('should ignore words in whitelist', () => {

            const list = ['more', 'one'];
            const input = 'more than one words.';
            const expected = 'more Than one Words.';

            expect(filter(input, list)).to.equal(expected);
        });

        it('should ignore letter casing of words in whitelist', () => {

            const list = ['More', 'ONE'];
            const input = 'more than one words.';
            const expected = 'more Than one Words.';

            expect(filter(input, list)).to.equal(expected);
        });

        it('should ignore digits', () => {

            const input = '3 plus 3 equals 6.';
            const expected = '3 Plus 3 Equals 6.';

            expect(filter(input)).to.equal(expected);
        });
    });
});

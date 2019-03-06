import { expect } from 'chai';

import { CapitalizePipe } from './capitalize.pipe';

context('capitalize pipe unit test', () => {

    let pipe;

    beforeEach('general test setup', () => {

        pipe = new CapitalizePipe();
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

        it('should capitalize single word from input', () => {

            const input = 'word';
            const expected = 'Word';

            expect(pipe.transform(input)).to.equal(expected);
        });

        it('should capitalize every word from input', () => {

            const input = 'more than one words.';
            const expected = 'More Than One Words.';

            expect(pipe.transform(input)).to.equal(expected);
        });

        it('should ignore words in whitelist', () => {

            const list = ['more', 'one'];
            const input = 'more than one words.';
            const expected = 'more Than one Words.';

            expect(pipe.transform(input, list)).to.equal(expected);
        });

        it('should ignore letter casing of words in whitelist', () => {

            const list = ['More', 'ONE'];
            const input = 'more than one words.';
            const expected = 'more Than one Words.';

            expect(pipe.transform(input, list)).to.equal(expected);
        });

        it('should ignore digits', () => {

            const input = '3 plus 3 equals 6.';
            const expected = '3 Plus 3 Equals 6.';

            expect(pipe.transform(input)).to.equal(expected);
        });
    });
});

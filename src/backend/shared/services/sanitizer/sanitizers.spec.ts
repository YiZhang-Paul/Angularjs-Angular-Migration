import { expect } from 'chai';

import sanitizer from './sanitizers';

context('sanitizer unit test', () => {

    describe('sanitize()', () => {

        it('should remove HTML tags', () => {

            const input = 'user<script src="xss"></script><img src="malicious"/> input';

            const result = sanitizer.sanitize(input);

            expect(result).to.equal('user input');
        });

        it('should remove contents between HTML tags', () => {

            const input = '<script>malicious-code</script>user input';

            const result = sanitizer.sanitize(input);

            expect(result).to.equal('user input');
        });

        it('should remove MongoDB reserved characters', () => {

            const input = '{ "$gt": "" }';

            const result = sanitizer.sanitize(input);

            expect(result).to.equal(' "gt": "" ');
        });
    });
});

import { expect } from 'chai';

import { ShortViewCountPipe } from './short-view-count.pipe';

context('short view count pipe unit test', () => {

    let pipe: ShortViewCountPipe;

    beforeEach('general test setup', () => {

        pipe = new ShortViewCountPipe('en-US');
    });

    describe('transform()', () => {

        it('should return same number when number is smaller than 1000', () => {

            const expected = '999';

            expect(pipe.transform(+expected)).to.equal(expected);
        });

        it('should append letter k and add comma separator when applicable', () => {

            const expected = '1,115,123.9k';

            expect(pipe.transform(1115123868)).to.equal(expected);
        });
    });
});

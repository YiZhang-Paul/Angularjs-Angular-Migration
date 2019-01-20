import { expect } from 'chai';

import validator from './validators';

context('validators unit test', () => {

    describe('isInteger()', () => {

        it('should return true when integer value is passed', () => {

            const result = validator.isInteger(55);

            expect(result).to.be.true;
        });

        it('should return false when non-integer value is passed', () => {

            const result = validator.isInteger(55.5);

            expect(result).to.be.false;
        });

        it('should return true when integer numeric string is passed', () => {

            const result = validator.isInteger('55');

            expect(result).to.be.true;
        });

        it('should return false when non-integer numeric string is passed', () => {

            const result = validator.isInteger('55.5');

            expect(result).to.be.false;
        });

        it('should return false when non-numeric string is passed', () => {

            const result = validator.isInteger('55a');

            expect(result).to.be.false;
        });
    });

    describe('isNonEmptyArray()', () => {

        it('should return true when array is not empty', () => {

            const result = validator.isNonEmptyArray([{}]);

            expect(result).to.be.true;
        });

        it('should return false when array is empty', () => {

            const result = validator.isNonEmptyArray([]);

            expect(result).to.be.false;
        });
    });

    describe('isEmail()', () => {

        it('should return true when e-mail is valid', () => {

            const email = 'valid@email.com';

            const result = validator.isEmail(email);

            expect(result).to.be.true;
        });

        it('should return false when e-mail is invalid', () => {

            const email = '.@invalid.email';

            const result = validator.isEmail(email);

            expect(result).to.be.false;
        });
    });

    describe('isUrl()', () => {

        it('should return true when url is valid', () => {

            const url = 'https://www.sample.com/api/v1/users';

            const result = validator.isUrl(url);

            expect(result).to.be.true;
        });

        it('should return false when url is invalid', () => {

            const url = 'https:///w.sample/api.v1/users';

            const result = validator.isUrl(url);

            expect(result).to.be.false;
        });
    });
});

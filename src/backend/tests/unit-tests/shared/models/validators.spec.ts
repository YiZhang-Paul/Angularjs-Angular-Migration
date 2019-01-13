import { expect } from 'chai';

import Validator from '../../../../shared/models/validators';

context('validators unit test', () => {

    describe('isInteger()', () => {

        it('should return true when integer value is passed', () => {

            const result = Validator.isInteger(55);

            expect(result).to.be.true;
        });

        it('should return false when non-integer value is passed', () => {

            const result = Validator.isInteger(55.5);

            expect(result).to.be.false;
        });

        it('should return true when integer numeric string is passed', () => {

            const result = Validator.isInteger('55');

            expect(result).to.be.true;
        });

        it('should return false when non-integer numeric string is passed', () => {

            const result = Validator.isInteger('55.5');

            expect(result).to.be.false;
        });

        it('should return false when non-numeric string is passed', () => {

            const result = Validator.isInteger('55a');

            expect(result).to.be.false;
        });
    });

    describe('isNonEmptyArray()', () => {

        it('should return true when array is not empty', () => {

            const result = Validator.isNonEmptyArray([{}]);

            expect(result).to.be.true;
        });

        it('should return false when array is empty', () => {

            const result = Validator.isNonEmptyArray([]);

            expect(result).to.be.false;
        });
    });

    describe('isUrl()', () => {

        it('should return true when url is valid', () => {

            const url = 'https://www.sample.com/api/v1/users';

            const result = Validator.isUrl(url);

            expect(result).to.be.true;
        });

        it('should return false when url is invalid', () => {

            const url = 'https:///w.sample/api.v1/users';

            const result = Validator.isUrl(url);

            expect(result).to.be.false;
        });
    });
});

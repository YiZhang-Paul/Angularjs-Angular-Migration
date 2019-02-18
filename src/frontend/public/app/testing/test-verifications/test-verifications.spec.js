import utilities from './test-verifications';

context('test verifications utilities unit test', () => {

    describe('hasMatchingValue()', () => {

        const key = 'given_key';
        let object;

        beforeEach('hasMatchingValue() test setup', () => {

            object = { [key]: 2 };
        });

        it('should return true when value of given key matches at least one other object', () => {

            const objects = [{ [key]: object[key] }, { [key]: object[key] + 1 }];

            const result = utilities.hasMatchingValue(object, objects, key);

            expect(result).to.be.true;
        });

        it('should return false when value of given key matches no other object', () => {

            const objects = [{ [key]: object[key] - 1 }, { [key]: object[key] + 1 }];

            const result = utilities.hasMatchingValue(object, objects, key);

            expect(result).to.be.false;
        });
    });

    describe('hasAuthenticationToken()', () => {

        it('should return true when authentication token is properly included', () => {

            const header = { 'Authorization': 'bearer xxxxxx.xxxxx.xxxxx' };

            const result = utilities.hasAuthenticationToken(header);

            expect(result).to.be.true;
        });

        it('should return false when authentication token is not properly included', () => {

            const header = { 'Authorization': 'xxxxxx.xxxxx.xxxxx' };

            const result = utilities.hasAuthenticationToken(header);

            expect(result).to.be.false;
        });

        it('should return false when authentication token is not included in authorization header', () => {

            const header = { 'Token': 'bearer xxxxxx.xxxxx.xxxxx' };

            const result = utilities.hasAuthenticationToken(header);

            expect(result).to.be.false;
        });
    });
});

import SharedModule from '../shared.module';

const mockModule = angular.mock.module;

context('generic utility service unit test', () => {

    let service;

    beforeEach(mockModule(SharedModule));

    beforeEach('general test setup', inject($injector => {

        service = $injector.get('genericUtilityService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('joinText()', () => {

        it('should remove leading and trailing spaces', () => {

            const expected = 'some-text';

            const result = service.joinText(' some  text ');

            expect(result).to.equal(expected);
        });

        it('should replace spaces with specified delimiter', () => {

            const expected = 'some&random&text';

            const result = service.joinText('some random  text', '&');

            expect(result).to.equal(expected);
        });
    });

    describe('excludeIndex()', () => {

        const collection = [1, 2, 3, 4, 5];

        it('should throw error when given index is smaller than 0', () => {

            expect(() => service.excludeIndex(collection, -1)).to.throw();
        });

        it('should throw error when given index is larger than maximum index', () => {

            const index = collection.length;

            expect(() => service.excludeIndex(collection, index)).to.throw();
        });

        it('should exclude element at given index', () => {

            const index = 2;
            const expected = collection.filter((_, i) => i !== index);

            const result = service.excludeIndex(collection, index);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('hasMatchingValues()', () => {

        const keys = ['key_1', 'key_2', 'key_3'];

        it('should return true when value for every key matches', () => {

            const a = { [keys[0]]: 1, [keys[1]]: 2, [keys[2]]: 3 };
            const b = { [keys[0]]: 1, [keys[1]]: 2, [keys[2]]: 3 };

            const result = service.hasMatchingValues(a, b, keys);

            expect(result).to.be.true;
        });

        it('should return false when value for at least one key does not match', () => {

            const a = { [keys[0]]: 1, [keys[1]]: 2, [keys[2]]: 3 };
            const b = { [keys[0]]: 1, [keys[1]]: 4, [keys[2]]: 3 };

            const result = service.hasMatchingValues(a, b, keys);

            expect(result).to.be.false;
        });
    });

    describe('hasOwnProperties()', () => {

        const keys = ['key_1', 'key_2'];

        it('should return true when all keys exist on object', () => {

            const object = { [keys[0]]: 1, 'random_key': 2, [keys[1]]: 3 };

            const result = service.hasOwnProperties(object, keys);

            expect(result).to.be.true;
        });

        it('should return false when at least one key does not exist on object', () => {

            const object = { [keys[0]]: 1, 'random_key': 2 };

            const result = service.hasOwnProperties(object, keys);

            expect(result).to.be.false;
        });
    });

    describe('findByProperties()', () => {

        const objects = [{ id: 1, age: 5, time: 2 }, { id: 3, age: 8, time: 5 }];
        const object = { id: 1, age: 5, time: 110 };

        it('should return object that matches values of all keys', () => {

            const expected = objects[0];

            const result = service.findByProperties(objects, object, ['id', 'age']);

            expect(result).to.deep.equal(expected);
        });

        it('should return null when no object matching values of all keys is found', () => {

            const result = service.findByProperties(objects, object, ['id', 'time']);

            expect(result).to.be.null;
        });
    });
});

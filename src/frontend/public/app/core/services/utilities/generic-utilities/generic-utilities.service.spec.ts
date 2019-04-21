import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { GenericUtilitiesService } from './generic-utilities.service';

context('generic utilities service unit test', () => {

    let service: GenericUtilitiesService;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [GenericUtilitiesService]
        });

        service = TestBed.get(GenericUtilitiesService);
    });

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

            const result = service.joinText('some random text', '&');

            expect(result).to.equal(expected);
        });
    });

    describe('excludeIndex()', () => {

        let collection;

        beforeEach('excludeIndex() test setup', () => {

            collection = [1, 2, 3, 4, 5];
        });

        it('should throw error when given index is smaller than 0', () => {

            expect(() => {

                service.excludeIndex(collection, -1);

            }).to.throw();
        });

        it('should throw error when given index is larger than maximum index', () => {

            expect(() => {

                const index = collection.length;

                service.excludeIndex(collection, index);

            }).to.throw();
        });

        it('should exclude element at given index', () => {

            const index = 2;
            const expected = collection.filter((_, i) => i !== index);

            const result = service.excludeIndex(collection, index);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('hasMatchingValues()', () => {

        let keys;

        beforeEach('hasMatchingValues() test setup', () => {

            keys = ['key_1', 'key_2', 'key_3'];
        });

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

        let keys;

        beforeEach('hasOwnProperties() test setup', () => {

            keys = ['key_1', 'key_2'];
        });

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

        let object;
        let objects;

        beforeEach('findByProperties() test setup', () => {

            object = { id: 1, age: 5, time: 110 };
            objects = [{ id: 1, age: 5, time: 2 }, { id: 3, age: 8, time: 5 }];
        });

        it('should return object that matches values of all keys', () => {

            const keys = ['id', 'age'];
            const expected = objects[0];

            const result = service.findByProperties(objects, object, keys);

            expect(result).to.deep.equal(expected);
        });

        it('should return null when no object matching values of all keys is found', () => {

            const keys = ['id', 'time'];

            const result = service.findByProperties(objects, object, keys);

            expect(result).to.be.null;
        });
    });
});

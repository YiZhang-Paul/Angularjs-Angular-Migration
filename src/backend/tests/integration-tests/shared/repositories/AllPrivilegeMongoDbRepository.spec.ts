import { expect } from 'chai';

import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';
import IProjection from '../../../../shared/repositories/IProjection.interface';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';

import TestModel from './testModel';

class AllPrivilegeMongoDbRepositoryForTest extends AllPrivilegeMongoDbRepository { }

context('AllPrivilegeMongoDbRepository integration test', () => {

    const fields = ['field_1', 'field_2', 'field_3', 'field_4'];
    let repository: AllPrivilegeMongoDbRepositoryForTest;

    beforeEach('test setup', async () => {

        await TestModel.clear();
        await TestModel.addDefault(3);

        repository = new AllPrivilegeMongoDbRepositoryForTest(TestModel);
    });

    describe('insert()', () => {

        it('should insert documents into database', async () => {

            const total = await TestModel.total();
            // TODO: integrate id check into repository
            const expected = createDataList(fields, 5, total + 1);

            const result = await repository.insert(expected);

            expect(await TestModel.total()).to.equal(total + result.length);
            expect(hasSameDataList(expected, result)).to.be.true;
        });

        it('should return empty collection when no document inserted', async () => {

            const result = await repository.insert([]);

            expect(result).to.be.empty;
        });
    });

    describe('insertOne()', () => {

        it('should insert one document into database', async () => {

            const total = await TestModel.total();
            // TODO: integrate id check into repository
            const expected = createData(fields, total + 1);

            const result = await repository.insertOne(expected);

            expect(await TestModel.total()).to.equal(total + 1);
            expect(hasSameData(expected, result)).to.be.true;
        });

        it('should return null when no document inserted', async () => {

            const data = { 'invalid_field': 'will_trigger_validation_error' };

            const result = await repository.insertOne(data);

            expect(result).to.be.null;
        });
    });

    describe('find()', () => {

        it('should find all documents', async () => {

            const result = await repository.find();

            expect(result).is.not.empty;
            expect(result.length).to.equal(await TestModel.total());
        });

        it('should find all documents matching the criteria', async () => {

            const total = await TestModel.total();
            const expected = 2;

            const result = await repository.find({ id: { $gt: total - expected } });

            expect(total).to.be.greaterThan(expected);
            expect(result.length).to.equal(expected);
        });

        it('should return empty collection when no document found', async () => {

            const filter = { 'field_not_exist': 'random_value' };

            const result = await repository.find(filter);

            expect(result).to.be.empty;
        });

        it('should include expected fields in projection', async () => {

            const expected = [fields[0], fields[2]];
            const projection: IProjection = { '_id': 0, [expected[0]]: 1, [expected[1]]: 1 };
            const option: IQueryOption = { projection };

            const result = await repository.find({}, option);

            result.forEach(document => {

                const paths = Object.keys(document.toObject());
                expect(paths).to.deep.equal(expected);
            });
        });

        it('should include selected fields', async () => {
            // field 3 and field 4 are hidden on default
            const expected = fields.slice(2);
            const option: IQueryOption = { select: expected };

            const result = await repository.find({}, option);

            result.forEach(document => {

                const paths = Object.keys(document.toObject());
                // ensure field 3 and field 4 are not the only fields in result
                expect(isSubArray(expected, paths)).to.be.true;
            });
        });
    });

    describe('findOne()', () => {

        const filter = { id: 2 };

        it('should find document matching the criteria', async () => {

            const expected = filter.id;

            const result = await repository.findOne(filter);

            expect(result).is.not.null;

            if (result) {

                const id = result.toObject()['id'];
                expect(id).to.equal(expected);
            }
        });

        it('should return null when no document found', async () => {

            const filter = { 'field_not_exist': 'random_value' };

            const result = await repository.findOne(filter);

            expect(result).to.be.null;
        });

        it('should include expected fields in projection', async () => {

            const expected = [fields[0], fields[2]];
            const projection: IProjection = { '_id': 0, [expected[0]]: 1, [expected[1]]: 1 };
            const option: IQueryOption = { projection };

            const result = await repository.findOne(filter, option);

            expect(result).is.not.null;

            if (result) {

                const paths = Object.keys(result.toObject());
                expect(paths).to.deep.equal(expected);
            }
        });

        it('should include selected fields', async () => {
            // field 3 and field 4 are hidden on default
            const expected = fields.slice(2);
            const option: IQueryOption = { select: expected };

            const result = await repository.findOne(filter, option);

            expect(result).is.not.null;

            if (result) {

                // ensure field 3 and field 4 are not the only fields in result
                const paths = Object.keys(result.toObject());
                expect(isSubArray(expected, paths)).to.be.true;
            }
        });
    });

    describe('update()', () => {

        const field = fields[1];
        const value = 'updated_field';
        const updateOption = { [field]: value };

        it('should update all documents', async () => {

            const original = await repository.find({});

            const result = await repository.update(updateOption);

            expect(original.some(_ => _.toObject()[field] === value)).to.be.false;
            expect(result.every(_ => _.toObject()[field] === value)).to.be.true;
        });

        it('should update all documents matching the criteria', async () => {

            const filter = { id: { $gt: 2 } };
            const original = await repository.find(filter);

            const result = await repository.update(updateOption, filter);

            expect(result.length).to.equal(original.length);
            expect(original.some(_ => _.toObject()[field] === value)).to.be.false;
            expect(result.every(_ => _.toObject()[field] === value)).to.be.true;
        });

        it('should not update when no matching document found', async () => {

            const invalidFilter = { 'field_not_exist': 'random_value' };

            const result = await repository.update({}, invalidFilter);

            expect(result).to.be.empty;
        });
    });

    describe('updateOne()', () => {

        it('should update document matching the criteria', async () => {

            const field = fields[1];
            const value = 'updated_field';
            const updateOption = { [field]: value };
            const filter = { id: { $gt: 2 } };
            const original = await repository.findOne(filter);

            const result = await repository.updateOne(updateOption, filter);

            expect(original).is.not.null;
            expect(result).is.not.null;

            if (original && result) {

                expect(result._id).to.deep.equal(original._id);
                expect(original.toObject()[field]).to.not.equal(value);
                expect(result.toObject()[field]).to.equal(value);
            }
        });

        it('should return null when no document updated', async () => {

            const filter = { 'field_not_exist': 'random_value' };
            const original = await repository.findOne(filter);

            const result = await repository.updateOne({}, filter);

            expect(original).to.be.null;
            expect(result).to.be.null;
        });
    });

    describe('delete()', () => {

        it('should delete all documents', async () => {

            const total = await TestModel.total();

            await repository.delete({});

            expect(total).to.be.greaterThan(0);
            expect(await TestModel.total()).to.equal(0);
        });

        it('should delete all documents matching the criteria', async () => {

            const filter = { id: { $gt: 2 } };
            const total = await TestModel.total();

            const result = await repository.delete(filter);

            expect(result).to.be.greaterThan(0);
            expect(await TestModel.total()).to.equal(total - result);
        });

        it('should not delete when no matching document found', async () => {

            const filter = { 'field_not_exist': 'random_value' };
            const total = await TestModel.total();

            const result = await repository.delete(filter);

            expect(result).to.equal(0);
            expect(await TestModel.total()).to.equal(total);
        });
    });

    describe('deleteOne()', () => {

        it('should delete document matching the criteria', async () => {

            const filter = { id: 2 };
            const total = await TestModel.total();

            const result = await repository.deleteOne(filter);

            expect(result).to.be.true;
            expect(await TestModel.total()).to.equal(total - 1);
        });

        it('should not delete when no matching document found', async () => {

            const filter = { 'field_not_exist': 'random_value' };
            const total = await TestModel.total();

            const result = await repository.deleteOne(filter);

            expect(result).to.be.false;
            expect(await TestModel.total()).to.equal(total);
        });
    });
});

// TODO: move these to separate class
function getRandomString(): string {

    return `${Math.random()}.${Math.random()}.${Math.random()}`;
}

function createData(fields: string[], id: number): any {

    const data: { [key: string]: any } = { id };

    fields.forEach(field => {

        data[field] = getRandomString();
    });

    return data;
}

function createDataList(fields: string[], total: number, startId: number): any {

    const data = [];

    for (let i = 0; i < total; i++) {

        data.push(createData(fields, startId + i));
    }

    return data;
}

function hasSameData(expected: any, result: any): boolean {

    return Object.keys(expected).every(key => result[key] === expected[key]);
}

function hasSameDataList(expected: any[], result: any[]): boolean {

    if (result.length !== expected.length) {

        return false;
    }

    return result.every((data, index) => hasSameData(expected[index], data));
}

function isSubArray<T>(array1: T[], array2: T[]): boolean {

    if (array1.length >= array2.length) {

        return false;
    }

    return array1.every(_ => array2.includes(_));
}

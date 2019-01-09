import { expect } from 'chai';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import TestModel from './testModel';
import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';

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

        it('should insert documents into database', async() => {

            const total = await TestModel.total();
            // TODO: integrate id check into repository
            const expected = createDataList(fields, 5, total + 1);

            const inserted = await repository.insert(expected);

            expect(await TestModel.total()).to.equal(total + inserted.length);
            expect(hasSameDataList(expected, inserted)).to.be.true;
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

        it('should include expected fields in projection', async () => {

            const expected = [fields[0], fields[2]];
            const projection = { '_id': 0, [expected[0]]: 1, [expected[1]]: 1 };
            const option = <IQueryOption>{ projection };

            const result = await repository.find({}, option);

            result.forEach(document => {

                const paths = Object.keys(document.toObject());
                expect(paths).to.deep.equal(expected);
            });
        });

        it('should include selected fields', async () => {
            // field 3 and field 4 are hidden on default
            const expected = fields.slice(2);
            const option = <IQueryOption>{ select: expected };

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
            const resultId = result.toObject()['id'];

            expect(result).is.not.null;
            expect(resultId).to.equal(expected);
        });

        it('should include expected fields in projection', async () => {

            const expected = [fields[0], fields[2]];
            const projection = { '_id': 0, [expected[0]]: 1, [expected[1]]: 1 };
            const option = <IQueryOption>{ projection };

            const result = await repository.findOne(filter, option);
            const paths = Object.keys(result.toObject());

            expect(result).is.not.null;
            expect(paths).to.deep.equal(expected);
        });

        it('should include selected fields', async () => {
            // field 3 and field 4 are hidden on default
            const expected = fields.slice(2);
            const option = <IQueryOption>{ select: expected };

            const result = await repository.findOne(filter, option);
            const paths = Object.keys(result.toObject());

            expect(result).is.not.null;
            // ensure field 3 and field 4 are not the only fields in result
            expect(isSubArray(expected, paths)).to.be.true;
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

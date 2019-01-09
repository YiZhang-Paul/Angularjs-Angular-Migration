import { expect } from 'chai';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import TestModel from './testModel';
import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';

class AllPrivilegeMongoDbRepositoryForTest extends AllPrivilegeMongoDbRepository { }

context('AllPrivilegeMongoDbRepository integration test', () => {

    let repository: AllPrivilegeMongoDbRepositoryForTest;

    beforeEach('test setup', async () => {

        await TestModel.clear();
        await TestModel.addDefault(3);

        repository = new AllPrivilegeMongoDbRepositoryForTest(TestModel);
    });

    describe('insertOne()', () => {

        it('should insert one document into database', async () => {

            const total = await TestModel.total();
            const fields = ['field_1', 'field_2', 'field_3', 'field_4'];
            const expected = createData(fields);

            const inserted = await repository.insertOne(expected);
            const result = inserted.toObject();

            expect(await TestModel.total()).to.equal(total + 1);
            expect(areSame(expected, result, fields)).to.be.true;
        });
    });
});
// TODO: move these to separate class
function getRandomString(): string {

    return `${Math.random()}.${Math.random()}.${Math.random()}`;
}

function createData(fields: string[]): { [key: string]: string } {

    const data: { [key: string]: string } = {};

    fields.forEach(field => {

        data[field] = getRandomString();
    });

    return data;
}

function areSame(expected: any, result: any, fields: string[]): boolean {

    return fields.every(field => result[field] === expected[field]);
}

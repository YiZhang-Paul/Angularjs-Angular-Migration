import { expect } from 'chai';

// tslint:disable-next-line:max-line-length
import AllPrivilegeMongoDbRepository from '../../shared/repositories/all-privilege-mongodb-repository/all-privilege-mongodb-repository';
// tslint:disable-next-line:max-line-length
import { areSubObjects, createDataObjects, isSameArray, isSubArray, isSubObject } from '../../shared/test-utilities/generic-test-utilities';
import { getFieldNames, getFieldString } from '../../shared/test-utilities/mongoose-test-utilities';
import IProjection from '../../shared/repositories/projection.interface';
import IQueryOption from '../../shared/repositories/query-option.interface';
import SequentialIdGenerator from '../../shared/generators/id-generator/sequential-id-generator/sequential-id-generator';
import TestModel from '../../shared/test-utilities/test-models/test-model';
// tslint:disable-next-line:max-line-length
import UniqueIdDocumentGenerator from '../../shared/generators/document-generator/unique-id-document-generator/unique-id-document-generator';

context('AllPrivilegeMongoDbRepository integration test', () => {

    const fields = ['field_1', 'field_2', 'field_3', 'field_4'];
    let generator: SequentialIdGenerator;
    let documentGenerator: UniqueIdDocumentGenerator;
    let repository: AllPrivilegeMongoDbRepository;

    beforeEach('test setup', async () => {

        await TestModel.clear();
        await TestModel.addDefault(3);

        generator = new SequentialIdGenerator(TestModel);
        documentGenerator = new UniqueIdDocumentGenerator(generator);
        repository = new AllPrivilegeMongoDbRepository(documentGenerator);
    });

    describe('insert()', () => {

        it('should insert documents into database', async () => {

            const total = await TestModel.total();
            const expected = createDataObjects(fields, 5);

            const result = await repository.insert(expected);

            expect(await TestModel.total()).to.equal(total + result.length);
            expect(areSubObjects(expected, result)).to.be.true;
        });

        it('should return empty collection when no document inserted', async () => {

            const result = await repository.insert([]);

            expect(result).to.be.empty;
        });

        it('should ensure unique ids', async () => {

            const latestId = await TestModel.total();
            const data = createDataObjects(fields, 5);

            const result = await repository.insert(data);
            const ids = result.map(_ => getFieldString(_, 'id'));

            expect(ids).is.not.empty;
            expect(ids.every(id => +id > latestId)).to.be.true;
            expect(ids.length).to.equal(new Set(ids).size);
        });
    });

    describe('insertOne()', () => {

        it('should insert one document into database', async () => {

            const total = await TestModel.total();
            const expected = createDataObjects(fields, 1)[0];

            const result = await repository.insertOne(expected);

            expect(await TestModel.total()).to.equal(total + 1);
            expect(isSubObject(expected, result)).to.be.true;
        });

        it('should return null when no document inserted', async () => {

            const data = { 'invalid_field': 'will_trigger_validation_error' };

            const result = await repository.insertOne(data);

            expect(result).to.be.null;
        });

        it('should ensure unique id', async () => {

            const data = createDataObjects(fields, 1)[0];

            const result = await repository.insertOne(data);

            expect(result).is.not.null;

            if (result) {

                const id = getFieldString(result, 'id');
                const expected = await TestModel.total();

                expect(+id).to.equal(expected);
            }
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

                const paths = getFieldNames(document);
                expect(isSameArray(expected, paths)).to.be.true;
            });
        });

        it('should include selected fields', async () => {
            // field 3 and field 4 are hidden on default
            const expected = fields.slice(2);
            const option: IQueryOption = { select: expected };

            const result = await repository.find({}, option);

            result.forEach(document => {

                const paths = getFieldNames(document);
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

                expect(+getFieldString(result, 'id')).to.equal(expected);
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

                const paths = getFieldNames(result);
                expect(isSameArray(expected, paths)).to.be.true;
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
                const paths = getFieldNames(result);
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

            expect(original.some(_ => getFieldString(_, field) === value)).to.be.false;
            expect(result.every(_ => getFieldString(_, field) === value)).to.be.true;
        });

        it('should update all documents matching the criteria', async () => {

            const filter = { id: { $gt: 2 } };
            const original = await repository.find(filter);

            const result = await repository.update(updateOption, filter);

            expect(result.length).to.equal(original.length);
            expect(original.some(_ => getFieldString(_, field) === value)).to.be.false;
            expect(result.every(_ => getFieldString(_, field) === value)).to.be.true;
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
                expect(getFieldString(original, field)).to.not.equal(value);
                expect(getFieldString(result, field)).to.equal(value);
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

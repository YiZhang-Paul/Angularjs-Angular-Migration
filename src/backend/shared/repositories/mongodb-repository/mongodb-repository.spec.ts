import { expect } from 'chai';
import { SinonStubbedInstance } from 'sinon';

import IDocumentGenerator from '../../generators/document-generator/document-generator.interface';
import { createDocumentGeneratorStub } from '../../test-utilities/test-stubs/document-generator.stub';
import MongoDbRepository from '../../test-utilities/test-classes/mongodb-repository.test-class';
import IQueryOption from '../query-option.interface';
import TestModel from '../../test-utilities/test-models/test-model';

context('MongoDbRepository unit test', () => {

    let data: any;
    let filter: any;
    let option: IQueryOption;
    let documentGenerator: SinonStubbedInstance<IDocumentGenerator>;
    let repository: MongoDbRepository;
    const notSupportedError = 'not supported';

    beforeEach('test setup', () => {

        data = {};
        filter = {};
        option = {};
        documentGenerator = createDocumentGeneratorStub(TestModel);
        repository = new MongoDbRepository(documentGenerator);
    });

    describe('insert()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.insert([data])).to.throw(notSupportedError);
        });
    });

    describe('insertOne()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.insertOne(data)).to.throw(notSupportedError);
        });
    });

    describe('find()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.find(filter, option)).to.throw(notSupportedError);
        });
    });

    describe('findOne()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.findOne(filter, option)).to.throw(notSupportedError);
        });
    });

    describe('update()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.update(data, filter)).to.throw(notSupportedError);
        });
    });

    describe('updateOne()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.updateOne(data, filter)).to.throw(notSupportedError);
        });
    });

    describe('delete()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.delete(filter)).to.throw(notSupportedError);
        });
    });

    describe('deleteOne()', () => {

        it('should throw not supported error', () => {

            expect(() => repository.deleteOne(filter)).to.throw(notSupportedError);
        });
    });
});

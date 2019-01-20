import { expect } from 'chai';
import { SinonStubbedInstance } from 'sinon';

import { createDocumentGeneratorStub } from '../../../stubs/document-factory.stub';
import IDocumentGenerator from '../../../../shared/repositories/document-generator.interface';
import MongoDbRepository from '../../../test-classes/mongodb-repository.test-class';
import IQueryOption from '../../../../shared/repositories/query-option.interface';
import TestModel from '../../../test-model';

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

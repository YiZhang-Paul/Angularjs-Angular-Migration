import { expect } from 'chai';
import { SinonStubbedInstance } from 'sinon';

import IDocumentFactory from '../../../../shared/repositories/IDocumentFactory.interface';
import { createDocumentFactoryStub } from '../../../stubs/IDocumentFactory.stub';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import MongoDbRepository from '../../../testClasses/MongoDbRepository.testClass';

context('MongoDbRepository unit test', () => {

    let data: any;
    let filter: any;
    let option: IQueryOption;
    let documentFactory: SinonStubbedInstance<IDocumentFactory>;
    let repository: MongoDbRepository;
    const notSupportedError = 'not supported';

    beforeEach('test setup', () => {

        data = {};
        filter = {};
        option = {};
        documentFactory = createDocumentFactoryStub();
        repository = new MongoDbRepository(documentFactory);
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

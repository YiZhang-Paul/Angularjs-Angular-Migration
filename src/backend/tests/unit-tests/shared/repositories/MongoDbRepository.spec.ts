import { expect } from 'chai';
import { Document, Model } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

import IDocumentFactory from '../../../../shared/repositories/IDocumentFactory.interface';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import MongoDbRepository from '../../../../shared/repositories/MongoDbRepository';

class MongoDbRepositoryForTest extends MongoDbRepository { }

context('MongoDbRepository unit test', () => {

    let data: any;
    let filter: any;
    let option: IQueryOption;
    let model: Model<Document, {}>;
    let documentFactory: SinonStubbedInstance<IDocumentFactory>;
    let repository: MongoDbRepositoryForTest;
    const notSupportedError = 'not supported';

    beforeEach('test setup', () => {

        data = {};
        filter = {};
        option = {};
        model = {} as Model<Document, {}>;
        documentFactory = stub({} as IDocumentFactory);
        repository = new MongoDbRepositoryForTest(model, documentFactory);
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

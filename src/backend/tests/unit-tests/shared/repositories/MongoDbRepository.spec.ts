import { Document, Model } from 'mongoose';
import { expect } from 'chai';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import MongoDbRepository from '../../../../shared/repositories/MongoDbRepository';


class MongoDbRepositoryForTest extends MongoDbRepository {

    protected createDocument(data: any): Document { return <Document>{}; }
}

context('MongoDbRepository unit test', () => {

    let data: any;
    let filter: any;
    let option: IQueryOption;
    let model: Model<Document, {}>;
    let repository: MongoDbRepositoryForTest;
    const notSupportedError = 'not supported';

    beforeEach('test setup', () => {

        data = {};
        filter = {};
        option = {};
        model = <Model<Document, {}>>{};
        repository = new MongoDbRepositoryForTest(model);
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

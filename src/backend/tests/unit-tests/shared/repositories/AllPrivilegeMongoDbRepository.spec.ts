import { expect } from 'chai';
import { Document, DocumentQuery } from 'mongoose';
import { assert as sinonExpect, SinonStub, SinonStubbedInstance, stub } from 'sinon';

import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';
import IDocumentFactory from '../../../../shared/repositories/IDocumentFactory.interface';
import { createDocumentFactoryStub } from '../../../stubs/IDocumentFactory.stub';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import { createDocumentStub, createDocumentStubs } from '../../../stubs/MongoDbDocument.stub';
import { createDocumentQueryStub } from '../../../stubs/MongoDbDocumentQuery.stub';
import TestModel from '../../../testModel';
import { createEmptyObjects } from '../../../testUtilities';

context('AllPrivilegeMongoDbRepository unit test', () => {

    let documentFactory: SinonStubbedInstance<IDocumentFactory>;
    let queryStub: SinonStubbedInstance<DocumentQuery<Document[], Document, {}>>;
    let findStub: SinonStub;
    let findOneStub: SinonStub;
    let findOneAndUpdateStub: SinonStub;
    let repository: AllPrivilegeMongoDbRepository;

    beforeEach('test setup', () => {

        documentFactory = createDocumentFactoryStub(TestModel);
        queryStub = createDocumentQueryStub();
        findStub = stub(documentFactory.model, 'find').returns(queryStub);
        findOneStub = stub(documentFactory.model, 'findOne').returns(queryStub);
        findOneAndUpdateStub = stub(documentFactory.model, 'findOneAndUpdate');
        repository = new AllPrivilegeMongoDbRepository(documentFactory);
    });

    afterEach('test teardown', () => {

        findStub.restore();
        findOneStub.restore();
        findOneAndUpdateStub.restore();
    });

    describe('insert()', () => {

        let data: any[];
        let documents: SinonStubbedInstance<Document>[];

        beforeEach('insert() setup', () => {

            data = createEmptyObjects(4);
            documents = createDocumentStubs(data.length);
            documentFactory.createDocuments.resolves(documents);
        });

        it('should attempt to create and insert all documents', async () => {

            await repository.insert(data);

            sinonExpect.calledOnce(documentFactory.createDocuments);
            sinonExpect.calledWith(documentFactory.createDocuments, data);

            for (const document of documents) {

                sinonExpect.calledOnce(document.save);
            }
        });

        it('should return all inserted documents when all documents were inserted', async () => {

            const result = await repository.insert(data);

            expect(result.length).to.equal(data.length);
        });

        it('should only return documents that were successfully inserted', async () => {
            // last document will fail to save
            documents[documents.length - 1] = createDocumentStub(false);

            const result = await repository.insert(data);

            expect(result.length).to.equal(data.length - 1);

            for (const document of documents) {

                sinonExpect.calledOnce(document.save);
            }
        });

        it('should return empty collection when no documents were inserted', async () => {

            documents = createDocumentStubs(data.length, false);
            documentFactory.createDocuments.resolves(documents);

            const result = await repository.insert(data);

            expect(result).to.be.empty;
        });
    });

    describe('insertOne()', () => {

        let data: any;
        let document: SinonStubbedInstance<Document>;

        beforeEach('insertOne() setup', () => {

            data = {};
            document = createDocumentStub();
            documentFactory.createDocuments.resolves([document]);
        });

        it('should attempt to create and insert document', async () => {

            await repository.insertOne(data);

            sinonExpect.calledOnce(documentFactory.createDocuments);
            sinonExpect.calledWith(documentFactory.createDocuments, [data]);
            sinonExpect.calledOnce(document.save);
        });

        it('should return inserted document', async () => {

            const result = await repository.insertOne(data);

            expect(result).is.not.null;
        });

        it('should return null when failed to insert document', async () => {

            document = createDocumentStub(false);
            documentFactory.createDocuments.resolves([document]);

            const result = await repository.insertOne(data);

            expect(result).to.be.null;
        });
    });

    describe('find()', () => {

        let filter: any;
        let option: IQueryOption;

        beforeEach('find() setup', () => {

            filter = {};
            option = {};
        });

        it('should attempt to find documents', async () => {

            await repository.find(filter, option);

            sinonExpect.calledOnce(findStub);
        });

        it('should include projection when specified', async () => {

            option.projection = {};

            await repository.find(filter, option);

            sinonExpect.calledWith(findStub, filter, option.projection);
        });

        it('should include all field selections', async () => {

            option.select = ['field_1', 'field_2', 'field_3'];

            await repository.find(filter, option);

            sinonExpect.callCount(queryStub.select, option.select.length);
        });
    });

    describe('findOne()', () => {

        let filter: any;
        let option: IQueryOption;

        beforeEach('findOne() setup', () => {

            filter = {};
            option = {};
        });

        it('should attempt to find document', async () => {

            await repository.findOne(filter, option);

            sinonExpect.calledOnce(findOneStub);
        });

        it('should include projection when specified', async () => {

            option.projection = {};

            await repository.findOne(filter, option);

            sinonExpect.calledWith(findOneStub, filter, option.projection);
        });

        it('should include all field selections', async () => {

            option.select = ['field_1', 'field_2', 'field_3'];

            await repository.findOne(filter, option);

            sinonExpect.callCount(queryStub.select, option.select.length);
        });
    });

    describe('update()', () => {

        let data: any;
        let filter: any;
        let documents: Document[];

        beforeEach('update() setup', () => {

            data = {};
            filter = {};
            documents = createDocumentStubs(5);
            findStub.resolves(documents);

            documents.forEach((_, index) => {

                findOneAndUpdateStub.onCall(index).resolves(_);
            });
        });

        it('should find all documents that need to be updated', async () => {

            await repository.update(data, filter);

            sinonExpect.calledOnce(findStub);
        });

        it('should attempt to update all documents that match the criteria', async () => {

            await repository.update(data, filter);

            sinonExpect.callCount(findOneAndUpdateStub, documents.length);
        });

        it('should return all documents if they were all updated', async () => {

            const result = await repository.update(data, filter);

            expect(result).is.not.empty;
            expect(result.length).to.equal(documents.length);
        });

        it('should only return documents that were successfully updated', async () => {
            // last document will fail to update
            findOneAndUpdateStub.onCall(documents.length - 1).rejects(new Error());

            const result = await repository.update(data, filter);

            expect(result).is.not.empty;
            expect(result.length).to.equal(documents.length - 1);
        });

        it('should return empty collection when no documents were updated', async () => {

            findStub.resolves([]);

            const result = await repository.update(data, filter);

            expect(result).to.be.empty;
        });
    });

    describe('updateOne()', () => {

        let data: any;
        let filter: any;
        let document: Document;

        beforeEach('updateOne() setup', () => {

            data = {};
            filter = {};
            document = createDocumentStub();
            // TODO: resolves?
            findOneStub.resolves(document);
            findOneAndUpdateStub.resolves(document);
        });

        it('should find document that needs to be updated', async () => {

            await repository.updateOne(data, filter);

            sinonExpect.calledOnce(findOneStub);
        });

        it('should attempt to update document that matches the criteria', async () => {

            await repository.updateOne(data, filter);

            sinonExpect.calledOnce(findOneAndUpdateStub);
        });

        it('should return document when successfully updated', async () => {

            const result = await repository.updateOne(data, filter);

            expect(result).is.not.null;
        });

        it('should return null when no document was updated', async () => {

            findOneStub.returns(Promise.resolve(null));

            const result = await repository.updateOne(data, filter);

            expect(result).to.be.null;
        });

        it('should return null when failed to update the document', async () => {

            findOneAndUpdateStub.rejects(new Error());

            const result = await repository.updateOne(data, filter);

            expect(result).to.be.null;
            sinonExpect.calledOnce(findOneAndUpdateStub);
        });
    });
});

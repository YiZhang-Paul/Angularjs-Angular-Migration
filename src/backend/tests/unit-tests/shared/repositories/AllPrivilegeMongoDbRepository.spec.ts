import { expect } from 'chai';
import { Document } from 'mongoose';
import { assert as sinonExpect, SinonStubbedInstance } from 'sinon';

import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';
import IDocumentFactory from '../../../../shared/repositories/IDocumentFactory.interface';
import { createDocumentFactoryStub } from '../../../stubs/IDocumentFactory.stub';
import { createDocumentStub, createDocumentStubs } from '../../../stubs/MongoDbDocument.stub';
import { createEmptyObjects } from '../../../testUtilities';

context('AllPrivilegeMongoDbRepository unit test', () => {

    let documentFactory: SinonStubbedInstance<IDocumentFactory>;
    let repository: AllPrivilegeMongoDbRepository;

    beforeEach('test setup', () => {

        documentFactory = createDocumentFactoryStub();
        repository = new AllPrivilegeMongoDbRepository(documentFactory);
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
});

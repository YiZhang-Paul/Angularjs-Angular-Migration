import { Document, DocumentQuery } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

type Stubbed = SinonStubbedInstance<DocumentQuery<Document[], Document, {}>>;

export function createDocumentQueryStub(documents: Document[] = []): Stubbed {

    const stubbed = stub({} as DocumentQuery<Document[], Document, {}>);

    stubbed.limit = stub();
    stubbed.limit.resolves(documents);

    return stubbed;
}

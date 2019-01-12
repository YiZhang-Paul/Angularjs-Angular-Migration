import { Document, DocumentQuery } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

type Stubbed = SinonStubbedInstance<DocumentQuery<Document[], Document, {}>>;

export function createDocumentQueryStub(documents: Document[] = []): Stubbed {

    const stubbed = stub({} as Stubbed);

    stubbed.select = stub();
    stubbed.select.returns(stubbed);

    stubbed.sort = stub();
    stubbed.sort.returns(stubbed);

    stubbed.limit = stub();
    stubbed.limit.resolves(documents);

    return stubbed;
}

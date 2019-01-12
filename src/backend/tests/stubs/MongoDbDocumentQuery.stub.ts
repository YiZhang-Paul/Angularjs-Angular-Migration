import { Document, DocumentQuery } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

type Stubbed = SinonStubbedInstance<DocumentQuery<Document[], Document, {}>>;

export function createDocumentQueryStub(): Stubbed {

    const stubbed = stub({} as Stubbed);

    stubbed.select = stub();
    stubbed.select.returns(stubbed);

    return stubbed;
}

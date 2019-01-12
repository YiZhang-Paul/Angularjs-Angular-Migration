import { SinonStubbedInstance, stub } from 'sinon';

import IDocumentFactory from '../../shared/repositories/IDocumentFactory.interface';

type Stubbed = SinonStubbedInstance<IDocumentFactory>;

export function createDocumentFactoryStub(): Stubbed {

    const stubbed = stub({} as IDocumentFactory);

    stubbed.createDocument = stub();
    stubbed.createDocuments = stub();

    return stubbed;
}

import { Document, Model } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

import IDocumentFactory from '../../shared/repositories/IDocumentFactory.interface';

type Stubbed = SinonStubbedInstance<IDocumentFactory>;

export function createDocumentFactoryStub(model: Model<Document, {}>): Stubbed {

    const stubbed = stub({} as IDocumentFactory);

    Object.defineProperty(stubbed, 'model', { value: model });

    stubbed.createDocument = stub();
    stubbed.createDocuments = stub();

    return stubbed;
}

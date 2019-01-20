import { Document, Model } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

import IDocumentGenerator from '../../generators/document-generator/document-generator.interface';

type Stubbed = SinonStubbedInstance<IDocumentGenerator>;

export function createDocumentGeneratorStub(model: Model<Document, {}>): Stubbed {

    const stubbed = stub({} as IDocumentGenerator);

    Object.defineProperty(stubbed, 'model', { value: model });

    stubbed.createDocument = stub();
    stubbed.createDocuments = stub();

    return stubbed;
}

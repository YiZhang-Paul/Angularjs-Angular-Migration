import { Document, Model } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

import IIdGenerator from '../../generators/id-generator/id-generator.interface';

type Stubbed = SinonStubbedInstance<IIdGenerator>;

export function createIdGeneratorStub(model: Model<Document, {}>, id: string): Stubbed {

    const stubbed = stub({} as IIdGenerator);

    Object.defineProperty(stubbed, 'key', { value: 'id' });
    Object.defineProperty(stubbed, 'model', { value: model });

    stubbed.showNext = stub();
    stubbed.showNext.callsFake((_: string) => `${+_ + 1}`);

    stubbed.generate = stub();
    stubbed.generate.resolves(id);

    return stubbed;
}

import { SinonStubbedInstance, stub } from 'sinon';

import IIdGenerator from '../../shared/repositories/IIdGenerator.interface';

export function createIdGeneratorStub(id: string): SinonStubbedInstance<IIdGenerator> {

    const stubbed = stub({} as IIdGenerator);

    Object.defineProperty(stubbed, 'key', { value: 'id' });

    stubbed.showNext = stub();
    stubbed.showNext.callsFake((_: string) => String(+_ + 1));

    stubbed.generate = stub();
    stubbed.generate.resolves(id);

    return stubbed;
}

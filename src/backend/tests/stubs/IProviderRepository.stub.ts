import { Document } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

type Stubbed = SinonStubbedInstance<IProviderRepository>;
// TODO: accept an option object?
export function createProviderRepositoryStub(provider: Document | null = null): Stubbed {

    const stubbed = stub({} as IProviderRepository);

    stubbed.findByName = stub();
    stubbed.findByName.resolves(provider);

    return stubbed;
}

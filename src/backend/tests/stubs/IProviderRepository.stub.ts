import { SinonStubbedInstance, stub } from 'sinon';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

type Stubbed = SinonStubbedInstance<IProviderRepository>;

export function createProviderRepositoryStub(): Stubbed {

    const stubbed = stub({} as IProviderRepository);

    stubbed.findApisByName = stub();
    stubbed.findIdByName = stub();

    return stubbed;
}

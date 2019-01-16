import { SinonStubbedInstance, stub } from 'sinon';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

type Stubbed = SinonStubbedInstance<IProviderRepository>;
// TODO: accept an option object?
export function createProviderRepositoryStub(api = ''): Stubbed {

    const stubbed = stub({} as IProviderRepository);

    stubbed.findApi = stub();
    stubbed.findApi.resolves(api);

    return stubbed;
}

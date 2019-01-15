import config = require('config');

import AllPrivilegeMongoDbRepository from '../../shared/repositories/AllPrivilegeMongoDbRepository';
import IRepository from '../../shared/repositories/IRepository.interface';
import models from '../../shared/models';
import SequentialIdGenerator from '../../shared/repositories/SequentialIdGenerator';
import UniqueIdDocumentFactory from '../../shared/repositories/UniqueIdDocumentFactory';

if (process.env.INITIALIZE) {

    const generator = new SequentialIdGenerator(models.Provider);
    const documentFactory = new UniqueIdDocumentFactory(generator);
    const repository = new AllPrivilegeMongoDbRepository(documentFactory);

    const twitch = getProvider('twitch');
    const mixer = getProvider('mixer');

    initialize(repository, [twitch, mixer]);
}

function getProvider(name: string): any {

    const key = 'third_party_apis';
    const jsonData = JSON.stringify((config.get<any>(key)[name]));

    return JSON.parse(jsonData);
}

async function initialize(repository: IRepository, data: any[]): Promise<void> {

    await repository.delete({});

    repository.insert(data);
}

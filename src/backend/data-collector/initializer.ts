import config = require('config');
import mongoose = require('mongoose');

// TODO: refactor this
import AllPrivilegeMongoDbRepository from '../shared/repositories/AllPrivilegeMongoDbRepository';
import IRepository from '../shared/repositories/IRepository.interface';
import models from '../shared/models';
import SequentialIdGenerator from '../shared/repositories/SequentialIdGenerator';
import UniqueIdDocumentFactory from '../shared/repositories/UniqueIdDocumentFactory';

if (!process.env.INITIALIZED) {

    const generator = new SequentialIdGenerator(models.Provider);
    const documentFactory = new UniqueIdDocumentFactory(generator);
    const repository = new AllPrivilegeMongoDbRepository(documentFactory);

    initialize(repository, ['twitch', 'mixer']);
}

async function initialize(repository: IRepository, providers: string[]): Promise<void> {

    const providerData = providers.map(getProviderData);

    await repository.delete({});
    await repository.insert(providerData);

    process.env.INITIALIZED = 'true';
    console.log('Data collector initialized.');

    await mongoose.disconnect();
}

function getProviderData(name: string): any {

    const data = config.get<any>('third_party_apis')[name];

    return JSON.parse(JSON.stringify(data));
}

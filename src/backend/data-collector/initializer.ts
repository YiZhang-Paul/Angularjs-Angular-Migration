import config = require('config');
import mongoose = require('mongoose');

import IRepository from '../shared/repositories/IRepository.interface';
import ProviderRepositoryFactory from '../shared/repositories/ProviderRepositoryFactory';

if (!process.env.INITIALIZED) {

    const factory = new ProviderRepositoryFactory();
    const repository = factory.createRepository();

    initialize(repository, ['twitch', 'mixer']);
}

function getProviderData(name: string): any {

    const data = config.get<any>('third_party_apis')[name];

    return JSON.parse(JSON.stringify(data));
}

async function initialize(repository: IRepository, providers: string[]): Promise<void> {

    const providerData = providers.map(getProviderData);

    await repository.delete({});
    await repository.insert(providerData);

    process.env.INITIALIZED = 'true';
    console.log('Data collector initialized.');

    await mongoose.disconnect();
}

import config = require('config');
import mongoose = require('mongoose');

import IRepository from '../shared/repositories/IRepository.interface';
import ProviderRepositoryFactory from '../shared/repositories/ProviderRepositoryFactory';

import gameDataCollectorPromise from './factories/GameDataCollectorFactory';

if (!process.env.INITIALIZED) {

    const factory = new ProviderRepositoryFactory();
    const repository = factory.createRepository();

    initialize(repository, ['twitch', 'mixer']).then(() => {

        process.env.INITIALIZED = 'true';
        console.log('Data collector initialized.');
    });
}

function getProviderData(name: string): any {

    const data = config.get<any>('third_party_apis')[name];

    return JSON.parse(JSON.stringify(data));
}

async function initialize(repository: IRepository, providers: string[]): Promise<void> {

    const gameDataCollector = await gameDataCollectorPromise;

    await repository.delete({});
    await repository.insert(providers.map(getProviderData));

    await gameDataCollector.collect();
    await gameDataCollector.collectById(80);

    await mongoose.disconnect();
}

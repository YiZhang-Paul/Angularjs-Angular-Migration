import config = require('config');
import mongoose = require('mongoose');

import channelDataCollectorPromise from '../shared/services/data-collector/channel-data-collector/channel-data-collector.factory';
import gameDataCollectorPromise from '../shared/services/data-collector/game-data-collector/game-data-collector.factory';
import ProviderRepositoryFactory from '../shared/repositories/provider-repository/provider-repository.factory';
import IRepository from '../shared/repositories/repository.interface';

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
    const channelDataCollector = await channelDataCollectorPromise;

    await repository.delete({});
    await repository.insert(providers.map(getProviderData));

    await gameDataCollector.collect();
    await channelDataCollector.collect();

    await mongoose.disconnect();
}

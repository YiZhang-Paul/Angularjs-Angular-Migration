import config = require('config');
import Express = require('express');
import { Request, Response } from 'Express';
import mongoose = require('mongoose');

import { connectMongoose } from '../database';
import ProviderRepositoryFactory from '../shared/repositories/ProviderRepositoryFactory';

import './initializer';
import MixerChannelFetcher from './services/MixerChannelFetcher';
import MixerGameFetcher from './services/MixerGameFetcher';

const app = Express();
const port = config.get<{ collector: string }>('port').collector;
const providerRepositoryFactory = new ProviderRepositoryFactory();
const providerRepository = providerRepositoryFactory.createRepository();
const mixerGameFetcher = new MixerGameFetcher(providerRepository);
const mixerChannelFetcher = new MixerChannelFetcher(providerRepository);

app.get('*', (_: Request, res: Response) => res.sendStatus(200));

app.listen(port, () => {

    console.log(`Data collector started listening on port ${port}.`);
});

setInterval(async () => {

    connectMongoose();

    const games = await mixerGameFetcher.fetch();
    const channels = await mixerChannelFetcher.fetch();

    console.log(games.length);
    console.log(channels.length);

    await mongoose.disconnect();

}, 10000);

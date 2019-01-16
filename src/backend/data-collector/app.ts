import config = require('config');
import Express = require('express');
import { Request, Response } from 'Express';
import mongoose = require('mongoose');

import { connectMongoose } from '../database';

import './initializer';
import MixerChannelFetcher from './services/MixerChannelFetcher';
import MixerGameFetcher from './services/MixerGameFetcher';

const app = Express();
const port = config.get<{ collector: string }>('port').collector;
const mixerGameFetcher = new MixerGameFetcher();
const mixerChannelFetcher = new MixerChannelFetcher();

app.get('*', (_: Request, res: Response) => res.sendStatus(200));

app.listen(port, () => {

    console.log(`Data collector started listening on port ${port}.`);
});

setInterval(async () => {

    connectMongoose();

    const games = await mixerGameFetcher.fetch();
    const channels = await mixerChannelFetcher.fetch();

    console.log(channels);
    console.log(games.length);
    console.log(channels.length);

    await mongoose.disconnect();

}, 10000);

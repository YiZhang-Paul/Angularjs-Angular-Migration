import config = require('config');
import Express = require('express');
import { Request, Response } from 'Express';
// TODO: use or remove this
import mongoose = require('mongoose');

import { connectMongoose } from '../database';

import './initializer';
import MixerGameFetcher from './services/MixerGameFetcher';

const app = Express();
const port = config.get<{ collector: string }>('port').collector;
const mixerGameFetcher = new MixerGameFetcher();

app.get('*', (_: Request, res: Response) => res.sendStatus(200));

app.listen(port, () => {

    console.log(`Data collector started listening on port ${port}.`);
});

setInterval(async () => {

    connectMongoose();

    await mixerGameFetcher.fetch();

    await mongoose.disconnect();

}, 10000);

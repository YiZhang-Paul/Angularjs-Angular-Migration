import config = require('config');
import Express = require('express');
import { Request, Response } from 'Express';
import mongoose = require('mongoose');

import { connectMongoose } from '../database';

import gameDataCollector from './services/GameDataCollector';
import './initializer';

const app = Express();
const port = config.get<{ collector: string }>('port').collector;

app.get('*', (_: Request, res: Response) => res.sendStatus(200));

app.listen(port, () => {

    console.log(`Data collector started listening on port ${port}.`);
});

setInterval(async () => {

    connectMongoose();

    await gameDataCollector.collect();

    await mongoose.disconnect();

}, 3 * 60 * 1000);

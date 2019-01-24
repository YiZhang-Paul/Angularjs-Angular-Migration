import config = require('config');
import Express = require('express');
import { Request, Response } from 'Express';
import mongoose = require('mongoose');

import gameDataCollectorPromise from '../shared/services/data-collector/game-data-collector/game-data-collector.factory';
import { connectMongoose } from '../mongo-database';
import '../redis-database';

import './initializer';

const app = Express();
const port = config.get<{ collector: string }>('port').collector;

app.get('*', (_: Request, res: Response) => res.sendStatus(200));

app.listen(port, () => {

    console.log(`Data collector started listening on port ${port}.`);
});

setInterval(async () => {

    connectMongoose();

    const gameDataCollector = await gameDataCollectorPromise;

    await gameDataCollector.collect();

    await mongoose.disconnect();
    // TODO: move these into configuration
}, 1.5 * 60 * 1000);

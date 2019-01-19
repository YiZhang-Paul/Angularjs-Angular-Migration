// global integration test setup/teardown
import mongoose = require('mongoose');

import { cache } from '../../database';
import TestModel from '../testModel';

before('global integration test setup', done => {
    // ensure database is connected before all tests run
    mongoose.connection.once('open', () => {

        console.log('Test database connected.');
        done();
    });
});

after('global integration test teardown', async () => {

    await TestModel.deleteMany({});
    mongoose.disconnect();
    cache.quit();
});

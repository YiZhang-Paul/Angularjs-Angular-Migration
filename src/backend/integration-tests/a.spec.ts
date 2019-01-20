// global integration test setup/teardown
import mongoose = require('mongoose');

import '../mongo-database';
import { cache } from '../redis-database';
import TestModel from '../shared/test-utilities/test-models/test-model';

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

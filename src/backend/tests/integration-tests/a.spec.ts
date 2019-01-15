// global test setup/teardown
import mongoose = require('mongoose');

import TestModel from '../testModel';

before('global test setup', done => {
    // ensure database is connected before all tests run
    mongoose.connection.once('open', () => {

        console.log('Test database connected.');
        done();
    });
});

after('global test teardown', async () => {

    await TestModel.deleteMany({});
    mongoose.disconnect();
});

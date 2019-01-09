// global test setup/teardown
import mongoose = require('mongoose');

before('global test setup', done => {
    // ensure database is connected before all tests run
    mongoose.connection.once('open', () => {

        console.log('Test database connected.');
        done();
    });
});

after('global test teardown', () => {

    mongoose.disconnect();
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// global test setup/teardown
var mongoose = require("mongoose");
before('global test setup', function (done) {
    // ensure database is connected before all tests run
    mongoose.connection.once('open', function () {
        console.log('Test database connected.');
        done();
    });
});
after('global test teardown', function () {
    mongoose.disconnect();
});
//# sourceMappingURL=a.spec.js.map
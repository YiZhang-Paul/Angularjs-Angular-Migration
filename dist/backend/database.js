"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("config");
var mongoose = require("mongoose");
var useNewUrlParser = true;
mongoose.Promise = global.Promise;
mongoose.connect(createConnectionString(), { useNewUrlParser: useNewUrlParser });
mongoose.connection.on('error', function () { return console.log('Database connection failed.'); });
function createConnectionString() {
    var credentials = config.get('database');
    var url = credentials.host + "/" + credentials.name;
    var user = process.env.DB_USER;
    var password = process.env.DB_PASSWORD;
    return "mongodb://" + user + ":" + password + "@" + url;
}
//# sourceMappingURL=database.js.map
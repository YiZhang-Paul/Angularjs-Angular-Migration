"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var config = require("config");
var routes_1 = require("./routes");
require("../../database");
var app = Express();
var port = config.get('port').api;
var rootUrl = config.get('root_url');
app.get('/', function (_, res) { return res.redirect(rootUrl); });
app.use(rootUrl, routes_1.default.index);
app.use(rootUrl + "/users", routes_1.default.user);
app.get('*', function (_, res) { return res.sendStatus(404); });
// export server for api testing
exports.server = app.listen(port, function () {
    console.log("API started listening on port " + port + ".");
});
//# sourceMappingURL=app.js.map
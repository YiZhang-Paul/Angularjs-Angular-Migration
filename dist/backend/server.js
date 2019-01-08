"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var config = require("config");
var app = Express();
var port = config.get('port').server;
app.get('/', function (_, res) { return res.sendStatus(200); });
app.get('*', function (_, res) { return res.sendStatus(404); });
app.listen(port, function () {
    console.log("Server started listening on port " + port + ".");
});
//# sourceMappingURL=server.js.map
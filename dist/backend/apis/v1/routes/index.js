"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("./user");
var router = express_1.Router();
router.get('/', function (_, res) { return res.sendStatus(200); });
exports.default = {
    index: router,
    user: user_1.default
};
//# sourceMappingURL=index.js.map
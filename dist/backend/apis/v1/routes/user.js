"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (_, res) { return res.sendStatus(200); });
router.post('/', function (_, res) { return res.sendStatus(201); });
exports.default = router;
//# sourceMappingURL=user.js.map
const router = require('express').Router();

router.get('/', (_, res) => res.sendStatus(200));

exports.Index = router;
exports.User = require('./user');

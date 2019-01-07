const router = require('express').Router();


const database = require('../../../database');
const models = require('../../../models');
const User = models.User;

router.post('/', (req, res) => {

    database().on('connect', () => {

        console.log('hi');
    })

    User.create();

    res.status(200).send('created');
});

module.exports = router;

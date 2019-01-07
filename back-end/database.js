const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function getConnectionString(config) {

    const url = `${config.host}/${config.name}`;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;

    return `mongodb://${user}:${password}@${url}`;
}

function getConnection() {

    if (!global.config || !global.config.database) {

        return null;
    }

    const config = global.config.database;
    const options = Object.freeze({ useNewUrlParser: true });
    mongoose.connect(getConnectionString(config), options);

    return mongoose.connection;
}

module.exports = getConnection;

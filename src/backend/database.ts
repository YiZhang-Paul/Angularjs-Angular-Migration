import config = require('config');
import mongoose = require('mongoose');

const useNewUrlParser = true;
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(createConnectionString(), { useNewUrlParser });
mongoose.connection.on('error', () => console.log('Database connection failed.'));

function createConnectionString(): string {

    const credentials = config.get<any>('database');
    const url = `${credentials.host}/${credentials.name}`;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;

    return `mongodb://${user}:${password}@${url}`;
}

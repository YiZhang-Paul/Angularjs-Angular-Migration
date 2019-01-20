import config = require('config');
import mongoose = require('mongoose');

const useNewUrlParser = true;
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

connectMongoose();

function createConnectionString(): string {

    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const credentials = config.get<any>('database');
    const url = `${credentials.host}/${credentials.name}`;

    return `mongodb://${user}:${password}@${url}`;
}

function addListener(name: string, message: string): void {

    if (!mongoose.connection.listeners(name).length) {

        mongoose.connection.on(name, () => console.log(message));
    }
}

export function connectMongoose(): void {

    mongoose.connect(createConnectionString(), { useNewUrlParser });

    addListener('open', 'Database connection opened.');
    addListener('error', 'Database connection failed.');
    addListener('connected', 'Database connected.');
    addListener('disconnected', 'Database disconnected.');
}

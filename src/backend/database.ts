import config = require('config');
import mongoose = require('mongoose');
import redis = require('redis');

const useNewUrlParser = true;
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
connectMongoose();

// TODO: separate database files?
export const cache = redis.createClient();
cache.on('connect', () => console.log('Redis connected.'));
cache.on('end', () => console.log('Redis disconnected.'));
cache.on('error', error => console.log(error));

function createConnectionString(): string {

    const credentials = config.get<any>('database');
    const url = `${credentials.host}/${credentials.name}`;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;

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
    addListener('connected', 'Database connected.');
    addListener('error', 'Database connection failed.');
    addListener('disconnected', 'Database disconnected.');
}

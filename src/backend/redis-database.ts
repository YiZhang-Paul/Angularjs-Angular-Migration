import redis = require('redis');

export const cache = redis.createClient();

cache.on('connect', () => console.log('Redis connected.'));
cache.on('end', () => console.log('Redis disconnected.'));
cache.on('error', error => console.log(error));

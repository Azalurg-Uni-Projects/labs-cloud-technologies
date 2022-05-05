const Redis = require('ioredis');

const dbConnData = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};
const client = new Redis(dbConnData);

module.exports = client;

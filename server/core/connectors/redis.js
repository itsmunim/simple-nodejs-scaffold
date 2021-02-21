const redis = require('redis');
const logger = require('@core/logger');

async function connect() {
  const { REDIS_PORT } = process.env;
  const client = redis.createClient({
    host: 'localhost',
    port: REDIS_PORT,
  });
  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      logger.log('redis is connected');
      resolve(client);
    });
    client.on('error', (err) => {
      logger.log('redis connection failed');
      reject(err);
    });
  });
}

module.exports = {
  connect,
};

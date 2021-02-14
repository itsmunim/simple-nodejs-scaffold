const mongoose = require('mongoose');
const logger = require('@core/logger');

async function connectMongoDb() {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
  } = process.env;

  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

  const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
  };

  try {
    await mongoose.connect(url, options);
    logger.log('mongo db is connected');
  } catch (ex) {
    logger.log('mongo db connection failed', ex);
  }
}

module.exports = {
  connectMongoDb,
};

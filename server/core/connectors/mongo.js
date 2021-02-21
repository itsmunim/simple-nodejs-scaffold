const mongoose = require('mongoose');
const logger = require('@core/logger');

async function connect() {
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
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(url, options);
    logger.log('mongo db is connected');
  } catch (ex) {
    logger.log('mongo db connection failed');
    return Promise.reject(ex);
  }
}

module.exports = {
  connect,
};

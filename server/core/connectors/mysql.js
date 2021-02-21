const { Sequelize } = require('sequelize');
const logger = require('@core/logger');

async function connect() {
  const {
    MYSQL_USER: username,
    MYSQL_PASSWORD: password,
    MYSQL_DB: database,
    MYSQL_PORT: port,
    MYSQL_HOSTNAME: host,
  } = process.env;

  const sequelize = new Sequelize({
    username,
    password,
    database,
    port,
    host,
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    logger.log('mysql is connected');
    return sequelize;
  } catch (ex) {
    logger.log('mysql connection failed');
    return Promise.reject(ex);
  }
}

module.exports = {
  connect,
};

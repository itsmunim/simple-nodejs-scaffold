const fs = require('fs');
const path = require('path');
const logger = require('@core/logger');

async function connectAll() {
  const ignore = [
    'index',
    // list down the connectors that should be ignored
    'mysql',
  ];

  const connectors = fs
    .readdirSync(path.resolve(__dirname))
    .filter((connector) => {
      connector = connector.replace('.js', '');
      return !ignore.includes(connector);
    })
    .map((connector) => {
      return require(`./${connector}`).connect();
    });

  try {
    const connectionObjects = await Promise.all(connectors);
    return connectionObjects;
  } catch (ex) {
    logger.log('connectors.connectAll', ex);
    process.exit(1);
  }
}

module.exports = {
  connectAll,
};

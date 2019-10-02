const config = require('@config');
const debug = require('debug')(config.SERVER_NAME);

module.exports = {
  log: debug
};

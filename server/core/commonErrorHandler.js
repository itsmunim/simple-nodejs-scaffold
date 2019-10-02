const statusCodes = require('http-status-codes');

const logger = require('@core/logger');

/**
 * Takes care of any uncaught error that was not handled specifically for
 * a specific app instance.
 * @param app Express app instance
 */
function attachWithApp(app) {
  app.use((err, req, res, next) => {
    if (!err) {
      next();
    }

    logger.log('Error: %s %O', err.message, err.stack);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).send({
      'message': 'Internal Server Error'
    });
  });
}

module.exports = {
  attachWithApp
};

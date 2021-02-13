const logger = require('@core/logger');
const config = require('@config');

/**
 * A basic shutdown manager for the node backend. In case of any emergencies,
 * if manual interruption is initiated, it can do graceful shutdown of pending
 * connections and rollbacks.
 * @param server An already spawn server instance
 */
function manage(server) {
  let connections = [];

  let shutDown = () => {
    logger.log('Received kill signal, shutting down gracefully');

    server.close(() => {
      logger.log('Closed out remaining connections');
      process.exit(0);
    });

    connections.forEach((curr) => {
      curr.end();
    });

    setTimeout(() => {
      connections.forEach((curr) => {
        curr.destroy();
      });
    }, config.CONNECTION_CLOSING_TIME);

    setTimeout(() => {
      logger.log(
        'Could not close connections in time, forcefully shutting down'
      );
      process.exit(1);
    }, config.WAIT_TIME_BEFORE_FORCE_SHUTDOWN);
  };

  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);

  server.on('connection', (connection) => {
    connections.push(connection);
    logger.log('%s connections currently open', connections.length);
    connection.on('close', function () {
      connections = connections.filter((curr) => {
        return curr !== connection;
      });
    });
  });
}

module.exports = {
  manage
};

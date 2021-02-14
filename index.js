const server = require('./server');

function options() {
  let options = {};
  options.port = process.env.PORT;
  options.clientDirPath = process.env.CLIENT_DIR || null;
  options.indexPath = process.env.INDEX || null;
  options.staticDirPath = process.env.STATIC_DIR || null;
  return options;
}

/**
 * Initialize the service and start managing it.
 */
(async function () {
  const service = await server.start(options());
  server.autoManageShutdown(service);
})();

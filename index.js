const server = require('./server');

function options() {
  let options = {};
  options.port = process.env.PORT;
  options.clientDirPath = process.env.CLIENT_DIR || null;
  options.indexPath = process.env.INDEX || null;
  options.staticDirPath = process.env.STATIC_DIR || null;
  return options;
}

server.autoManageShutdown(server.start(options()));

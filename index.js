const bootstrapper = require('./server/core/bootstrapper');
const shutDownManager = require('./server/core/shutdownManager');
const logger = require('./server/core/logger');
const config = require('./server/config');
const apiRoute = require('./server/api');

function _bootstrap_() {
  let frontEndDir = process.env.CLIENT_DIR || null;
  let indexPath = process.env.INDEX || null;
  let staticDirPath = process.env.STATIC_DIR || null;

  if (frontEndDir) {
    return bootstrapper.initiate(frontEndDir);
  }

  if (indexPath && staticDirPath) {
    return bootstrapper.initiateWithIndexAndStaticDir(indexPath, staticDirPath);
  }

  return bootstrapper.initiate();
}

let port = process.env.PORT || config.DEFAULT_PORT;
let app = _bootstrap_();

app.use('/api', apiRoute);

let server = app.listen(port, function () {
  logger.log(`Server started on port ${port}`);
});

// Manage graceful shutdown and proper logging
shutDownManager.manage(server);



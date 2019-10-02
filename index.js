// start - initialize module aliases
require('module-alias/register');
// end - initialize module aliases

const bootstrapper = require('@core/bootstrapper');
const shutDownManager = require('@core/shutdownManager');
const logger = require('@core/logger');
const config = require('@config');
const apiRoute = require('@api');

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

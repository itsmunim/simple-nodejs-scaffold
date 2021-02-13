const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const errorUtils = require('@root/utils/error');
const logger = require('@core/logger');

/**
 * Creates a barebone express app with basic setup.
 */
function _initialize_() {
  let app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).send({ message: 'Up and running' });
  });

  return app;
}

/**
 * The main entry point that creates the express app instance which later spins
 * up as server.
 * @param clientPath The absolute path for client app folder which needs to be
 * served by this app, must have an index.html with resources folder named
 * as any of these-
 * `resources`, `static`, `dist`
 *
 * So, the file structure inside the client folder must be like below-
 * ```
 * client
 * - index.html
 * - dist(or static or resources)/
 * - ...
 *
 * If the `clientPath` is not given, returns a basic express app instance.
 * ```
 * @returns {Function}
 */

function initiate(clientPath) {
  let app = _initialize_();

  if (clientPath) {
    if (fs.existsSync(clientPath)) {
      let staticPaths = ['dist', 'resources', 'static'];

      staticPaths.forEach((staticPath) => {
        app.use(express.static(path.resolve(clientPath, staticPath)));
      });

      app.get('/', function (req, res) {
        res.sendFile(path.resolve(clientPath, 'index.html'));
      });
    } else {
      logger.log('invalid client folder path; try absolute path or make sure it exists');
    }
  }

  return app;
}

/**
 * Explicitly define the client index.html absolute path and static directory to serve
 * @param indexPath
 * @param staticDirPath
 */
function initiateWithIndexAndStaticDir(indexPath, staticDirPath) {
  let app = _initialize_();

  if (indexPath && staticDirPath && fs.existsSync(indexPath) && fs.existsSync(staticDirPath)) {
    app.use(express.static(staticDirPath));
    app.get('/', function (req, res) {
      res.sendFile(indexPath);
    });
  } else {
    errorUtils.throwError('index path and/or static dir path is invalid or make sure they exist');
    return;
  }

  return app;
}

module.exports = {
  initiate,
  initiateWithIndexAndStaticDir
};

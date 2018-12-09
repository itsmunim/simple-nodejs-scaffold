const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const commonErrorHandler = require('./commonErrorHandler');
const errorUtils = require('../utils/error');

function _initialize_() {
  let app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  commonErrorHandler.attachWithApp(app);

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
 * ```
 * @returns {Function}
 */

function initiate(clientPath) {
  let app = _initialize_();

  if (clientPath) {
    let staticPaths = ['dist', 'resources', 'static'];

    staticPaths.forEach((staticPath) => {
      app.use(express.static(path.resolve(clientPath, staticPath)));
    });

    app.get('/', function (req, res) {
      res.sendFile(path.resolve(clientPath, 'index.html'));
    });
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

  if (indexPath && staticDirPath) {
    app.use(express.static(staticDirPath));
    app.get('/', function (req, res) {
      res.sendFile(indexPath);
    });
  } else {
    errorUtils.throwError('index path and static dir need to be given')
  }

  return app;
}

module.exports = {
  initiate,
  initiateWithIndexAndStaticDir
};

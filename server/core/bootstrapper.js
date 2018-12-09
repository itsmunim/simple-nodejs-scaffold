const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const commonErrorHandler = require('./commonErrorHandler');

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
  let app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  commonErrorHandler.attachWithApp(app);

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

module.exports = {
  initiate
};

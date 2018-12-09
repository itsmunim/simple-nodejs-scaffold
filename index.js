const bootstrapper = require('./server/core/bootstrapper');
const shutDownManager = require('./server/core/shutdownManager');
const logger = require('./server/core/logger');
const config = require('./server/config');

let app = bootstrapper.initiate();
let port = process.env.PORT || config.DEFAULT_PORT;

let server = app.listen(port, function () {
  logger.log(`Server started on port ${port}`);
});

// Manage graceful shutdown and proper logging
shutDownManager.manage(server);



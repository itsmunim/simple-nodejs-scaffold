const chalk = require('chalk');

function debug(message, ...args) {
  console.log('\n');
  console.log(chalk.green(message), ...args);
  console.log('\n');
}

function error(message, ...args) {
  console.log('\n');
  console.error(chalk.red(message), ...args);
  console.log('\n');
}

module.exports = {
  debug,
  error,
};

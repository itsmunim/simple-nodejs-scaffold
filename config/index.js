const configMap = {
  development: require('./development'),
  local: require('./local'),
  production: require('./production')
};

module.exports = Object.assign(require('./default'), configMap[process.env.NODE_ENV || 'local']);

function throwError(initiatingMethod, errorMessage) {
  throw new Error(`${arguments.callee.caller.name}: ${errorMessage}`);
}

module.exports = {
  throwError
};
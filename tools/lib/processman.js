function makeGoodExit() {
  process.exit(0);
}

function makeBadExit() {
  process.exit(1);
}

module.exports = {
  makeBadExit,
  makeGoodExit,
};

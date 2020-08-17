#!/usr/bin/env node
const generator = require('./lib/generator');

(function exec() {
  const args = process.argv.slice(2);

  if (args && args.length) {
    const resourceName = args[0];
    generator.generate(resourceName);
  }
})();

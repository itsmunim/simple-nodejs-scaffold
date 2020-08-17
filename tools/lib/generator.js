const path = require('path');
const logger = require('./logger');
const pman = require('./processman');
const renderer = require('./renderer');
const writer = require('./writer');

const outputDir = path.resolve(__dirname, '../../server/api');

/**
 * Generate resource files and add resource route to api index.
 * 
 * @param {*} resourceName
 */
async function generate(resourceName) {
  resourceName = resourceName.toLowerCase();
  if (/[._ ]/.test(resourceName)) {
    logger.error(
      'resource names of these formats are allowed: users, parkings, paid-customers, order-items etc.'
    );
    pman.makeBadExit();
  }

  const folderPath = path.join(outputDir, resourceName);

  try {
    writer.writeFiles(
      folderPath,
      renderer.renderBaseFiles({ resource: { name: resourceName } })
    );
    const indexFileContent = renderer.renderIndexFile(
      path.join(outputDir, 'index.js'),
      resourceName,
      resourceName
    );
    writer.write(outputDir, 'index.js', indexFileContent);
    logger.debug('completed generating the resource files and adding route to api index');
  } catch (err) {
    logger.error('failed to generate necessary files', err);
    pman.makeBadExit();
  }
}

module.exports = {
  generate,
};

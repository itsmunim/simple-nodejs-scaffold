const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const pman = require('./processman');
const logger = require('./logger');

const baseTplDirPath = path.resolve(__dirname, '../templates');

/**
 * Renders API index file with necessary changes.
 *
 * @param {*} apiIndexPath
 * @param {*} resourceFolderName
 * @param {*} resourcePrefix
 */
function renderIndexFile(apiIndexPath, resourceFolderName, resourcePrefix) {
  const content = fs.readFileSync(apiIndexPath, 'utf8');
  const normalisedName = resourceFolderName.replace(
    /-([a-zA-Z])/g,
    (m) => m[1] && m[1].toUpperCase()
  );
  const importLine = `const ${normalisedName} = require('./${resourceFolderName}');\n/** --route:import-- */`;
  const hookLine = `router.use(${normalisedName}.config.ENDPOINT, ${normalisedName}.route);\n/** --route-- */`;

  return content
    .replace('/** --route:import-- */', importLine)
    .replace('/** --route-- */', hookLine);
}

function renderBaseFiles(data, ignoreFiles = []) {
  return renderFiles(baseTplDirPath, data, ignoreFiles);
}

/**
 * Render template files in a given dir.
 * @param {*} dirPath
 * @param {*} data
 * @param {array} ignoreFiles Files that should be ignored, e.g. ['ingress', 'hpa']
 */
function renderFiles(dirPath, data, ignoreFiles = []) {
  if (!dirPath || !data) {
    throw new Error('Either dirPath or data is not provided.');
  }

  const tplContentMap = {};
  fs.readdirSync(dirPath).forEach((f) => {
    if (!ignoreFiles.includes(f)) {
      const tplPath = path.join(dirPath, f);
      tplContentMap[f] = render(tplPath, data);
    }
  });

  return tplContentMap;
}

/**
 * Render a template file with given data.
 *
 * @param {*} tplPath
 * @param {*} data
 */
function render(tplPath, data) {
  if (!fs.existsSync(tplPath)) {
    logger.error(`template render failed; ${tplPath} was not found.`);
    pman.makeBadExit();
  }

  try {
    const tpl = fs.readFileSync(tplPath, 'utf8');
    const compiled = handlebars.compile(tpl);
    return compiled(data);
  } catch (err) {
    logger.error(`template render failed.`, err);
    pman.makeBadExit();
  }
}

module.exports = {
  renderBaseFiles,
  renderIndexFile,
};

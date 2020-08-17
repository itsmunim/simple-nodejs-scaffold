const fs = require('fs');
const path = require('path');

/**
 * Given a filemap of filename vs file content along with
 * a folder path, creates all the .yml files.
 * @param {*} rootPath the absolute path of where the output folder exists
 * @param {*} fileMap contains file content against it's name as key
 * @param {*} folder the output folder
 */
function writeFiles(rootPath, fileMap, folder) {
  Object.keys(fileMap).forEach((filename) => {
    write(
      rootPath,
      `${filename}.js`.replace('.tpl', ''),
      fileMap[filename],
      folder,
    );
  });
}

function write(rootPath, filename, content, folder = '') {
  const embeddedDir = path.dirname(filename);
  const dumpDirPath = path.join(rootPath, folder, embeddedDir);
  if (!fs.existsSync(dumpDirPath)) {
    fs.mkdirSync(dumpDirPath, {recursive: true});
  }
  const dumpPath = path.join(dumpDirPath, path.basename(filename));
  fs.writeFileSync(dumpPath, content);
}

module.exports = {
  writeFiles,
  write,
};

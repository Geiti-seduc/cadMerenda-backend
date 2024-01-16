const fs = require('fs');

function createDir(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

module.exports = {
  createDir,
};

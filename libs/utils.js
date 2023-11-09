const { readFileSync } = require('fs');

function readFile (path) {
  return readFileSync(path, 'utf8');
}

module.exports = {
  readFile
}
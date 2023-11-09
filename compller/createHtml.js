const {
  readdirSync,
  copyFileSync
} = require('fs');


const {readFile} = require('../libs/utils');

const {
  outerPath: {
    htmlPath,
    rootPath
  },
  innerDir: {
    htmlDir
  }
} = require('../config');


function createIndexHtml () {
  const _htmlFiles = readdirSync(htmlPath);
  console.log('createIndexHtml111', _htmlFiles)
  if(!_htmlFiles.length) {
    console.log('createIndexHtml')
    copyFileSync(htmlDir + '/index.html', rootPath + '/index.html', 0, function (err) {
      if (err) {
        throw new Error('Folder is failed to copy.', err)
      }
    })
    return;
  }
  console.log('--_innerHtmlStr--')
  const _innerHtmlStr = readFile(htmlDir + "/index.html");
  console.log('_innerHtmlStr--',_innerHtmlStr)
}

module.exports = {
  createIndexHtml
};
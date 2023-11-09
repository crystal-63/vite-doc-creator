const { mkdirSync, existsSync } = require('fs');

const {
  outerPath: {
    srcPath,  // src
    jsPath,   // src/js
    cssPath,   // src/css
    htmlPath,   // src/html
    mdPath   // workspace
  }
} = require('../config');

function initFolders () {
  console.log('234243')
  // 相应文件夹不存在的情况下再创建文件夹
  if(!existsSync(srcPath)) {
    createFolders(srcPath);
  }

  if(!existsSync(jsPath)) {
    createFolders(jsPath);
  }

  if(!existsSync(cssPath)) {
    createFolders(cssPath);
  }

  if(!existsSync(htmlPath)) {
    createFolders(htmlPath);
  }

  if(!existsSync(mdPath)) {
    createFolders(mdPath);
  }
}

function createFolders (path) {
  // 同步创建文件夹
  /**
   * param path 文件夹路径
   * param callback 创建失败， 错误信息抛出
   * 
   */
  console.log('error', err)
  mkdirSync(path, function (err) {
    if(err) {
      throw new Error('Folder is failed to create.', err)
    }
  })
}

module.exports = initFolders;
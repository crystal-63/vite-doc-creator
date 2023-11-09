const {
  readdirSync,
  copyFileSync,
  writeFileSync
} = require('fs');


const {
  readFile,
  createMenuItem,
  replaceHtml,
  createIframe
} = require('../libs/utils');

const {
  title,
  outerPath: {
    htmlPath,
    rootPath
  },
  innerDir: {
    htmlDir
  },
  regexp: {
    reg_ulContent,
    reg_titleContent,
    reg_headerTitileContent,
    reg_iframeContent
  }
} = require('../config');

// 创建index.html
function createIndexHtml (options) {
  console.log('options',options)
  const _htmlFiles = readdirSync(htmlPath);
  if(!_htmlFiles.length) {
    copyFileSync(htmlDir + '/index.html', rootPath + '/index.html', 0, function (err) {
      if (err) {
        throw new Error('Folder is failed to copy.', err)
      }
    })
    return;
  }
  // 读取模版index.html内的html字符串
  const _indexHtmlStr = readFile(htmlDir + "/index.html");

  let menuList = '';
  let newHtml = '';

  // 遍历外层html文件夹下的所有文件， 并组合成menuList
  _htmlFiles.map(function (filename, index) {
    menuList += createMenuItem(filename, options.domain, options.port, !index ? true : false);
  })

  // 替换ul中的内容
  newHtml = replaceHtml(reg_ulContent, _indexHtmlStr, menuList);
  // 替换title中的内容
  newHtml = replaceHtml(reg_titleContent, newHtml, options.title || title);
  // 替换header-title中的内容
  newHtml = replaceHtml(reg_headerTitileContent, newHtml, options.title || title);
  // 替换iframe中的内容
  newHtml = replaceHtml(reg_iframeContent, newHtml, createIframe(_htmlFiles[0]), options.domain, options.port);

  // writeFileSync 写入文件
  /**
   * param  path: 创建一个文件的路径及文件名
   * param  content： 在这个文件中写入什么内容
   */
  writeFileSync(rootPath + '/index.html', newHtml, function (err) {
    if (err) {
      throw new Error('File is failed to write.', err);
    }
  });
}

module.exports = {
  createIndexHtml
};
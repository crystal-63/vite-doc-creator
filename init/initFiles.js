const {
  readdirSync,
  copyFileSync
} = require('fs');

const { createIndexHtml } = require('../compller');

const {
  outerPath: {
    cssPath,
    jsPath,
    htmlPath
  },
  innerDir: {
    cssDir,
    jsDir,
    htmlDir
  }
} = require('../config');

function initFiles (options) {
  console.log('initFiles')
  copyFiles('css');
  copyFiles('js');
  createIndexHtml(options);
  copyWelcomePage();
}

function copyFiles (field) {
  console.log('field', field)
  let _innerFiles = [];
  let _outerFiles = [];
  let _dir = '';
  let _path = '';

  // readdirSync 读取目录
  // [1.css，2.css，3.css]
  switch (field) {
    case 'css':
      _dir = cssDir;
      _path = cssPath;
      _innerFiles = readdirSync(cssDir);
      _outerFiles = readdirSync(cssPath);
      break;
    case 'js':
      _dir = jsDir;
      _path = jsPath;
      _innerFiles = readdirSync(jsDir);
      _outerFiles = readdirSync(jsPath);
      break;
    default:
      break;
  }
  // coptFileSync 拷贝文件
  /**
   * param origin file 源文件路径
   * param target file 需创建的目标文件路径及名称
   */
  _innerFiles.map(function (innerFile) {
    console.log('innerFile', innerFile)
    if (_outerFiles.indexOf(innerFile) === -1) {
      copyFileSync(_dir + '/' + innerFile, _path + '/' + innerFile, 0, function (err) {
        if (err) {
          throw new Error('Folder is failed to copy.', err)
        }
      });
    }
  })
}
// 拷贝欢迎页面
function copyWelcomePage () {
  const _htmlFiles = readdirSync(htmlPath);
  
  // 只有在外层html文件夹中没有任何文件的前提下拷贝welcome
  if(!_htmlFiles.length) {
    copyFileSync(htmlDir + '/welcome.html', htmlPath + '/welcome.html', 0, function (err) {
      if (err) {
        throw new Error('Folder is failed to copy.', err)
      }
    });
  }
}

module.exports = initFiles;
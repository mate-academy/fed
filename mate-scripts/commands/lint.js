'use strict';

const path = require('path');
const { getRootDir } = require('../getRootDir');
const { execCommandSafe } = require('../execCommand');

function lint(options) {
  const { html, styles, javascript } = options;

  const rootDir = getRootDir();

  html && lintHtml(rootDir);
  styles && lintStyles(rootDir);
  javascript && lintJs(rootDir);
}

function lintHtml(rootDir) {
  execCommandSafe(`linthtml ${path.join(rootDir, 'src/**/*.html')}`);
}

function lintStyles(rootDir) {
  execCommandSafe(`stylelint ${path.join(rootDir, 'src/**/*.*css')}`);
}

function lintJs(rootDir) {
  execCommandSafe(`eslint ${path.join(rootDir, 'src/**/*.js')}`);
}

module.exports = {
  lint,
};

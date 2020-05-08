'use strict';

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { build } = require('./build');
const { getRootDir } = require('../getRootDir');

function deploy() {
  const rootDir = getRootDir();

  build();

  fs.copySync(
    path.join(rootDir, './backstop_data/html_report'),
    path.join(rootDir, './dist/report/html_report'),
  );

  execSync(`git add ${path.join(rootDir, './dist')} -f`, { stdio: 'inherit' });
  execSync('git commit -m "make build" --no-verify', { stdio: 'inherit' });

  try {
    execSync('git push --delete origin gh-pages');
  } catch (e) {
    // do nothing
  }

  execSync('git subtree push --prefix dist origin gh-pages', { stdio: 'inherit' });
  execSync('git reset --soft HEAD^', { stdio: 'inherit' });

  fs.removeSync(path.join(rootDir, 'dist'));
}

module.exports = {
  deploy,
};

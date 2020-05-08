'use strict';

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { getRootDir } = require('../getRootDir');

function build() {
  const rootDir = getRootDir();

  fs.removeSync(path.join(rootDir, 'dist'));

  execSync('gulp build', { stdio: 'inherit' });
}

module.exports = {
  build,
};

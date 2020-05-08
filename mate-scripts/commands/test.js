'use strict';

const fs = require('fs-extra');
const path = require('path');
const { getRootDir } = require('../getRootDir');
const { execCommandSafe } = require('../execCommand');

function test() {
  const rootDir = getRootDir();

  fs.removeSync(
    path.join(rootDir, './backstop_data/bitmaps_test'),
  );

  execCommandSafe(
    `backstop test --config=${path.join(rootDir, 'config/backstop/backstopConfig.js')}`,
  );
}

module.exports = {
  test,
};

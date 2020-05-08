'use strict';

const fs = require('fs-extra');
const path = require('path');
const { getRootDir } = require('../getRootDir');
const { execCommand } = require('../execCommand');

const packagesPaths = {
  linthtml: 'node_modules/@mate-academy/linthtml-config',
};

const configFileNames = {
  linthtml: '.linthtmlrc.json',
};

async function init() {
  const rootDir = getRootDir();

  copyConfigs(rootDir);
  await initBackstop(rootDir);
}

function copyConfigs(rootDir) {
  copyCommonConfigs(rootDir);
  copyLayoutConfigs(rootDir);
  copyLinthtmlConfig(rootDir);
}

function copyCommonConfigs(rootDir) {
  const configsDir = path.join(__dirname, '../configs');
  const commonConfigsDir = path.join(configsDir, 'common');

  fs.copySync(commonConfigsDir, rootDir);
}

function copyLayoutConfigs(rootDir) {
  const configsDir = path.join(__dirname, '../configs');
  const layoutConfigsDir = path.join(configsDir, 'layout');

  fs.copySync(layoutConfigsDir, rootDir);
}

function copyLinthtmlConfig(rootDir) {
  fs.copyFileSync(
    path.join(rootDir, packagesPaths.linthtml, configFileNames.linthtml),
    path.join(rootDir, configFileNames.linthtml),
  );
}

async function initBackstop(rootDir) {
  const backstopFolder = path.join(rootDir, 'backstop_data');
  const referencesDir = path.join(backstopFolder, 'bitmaps_reference');

  fs.removeSync(referencesDir);

  execCommand(`backstop reference --config=${path.join(rootDir, './config/backstop/backstopConfig.js')}`);
}

module.exports = {
  init,
};

'use strict';

const fs = require('fs');
const path = require('path');

const packageJson = 'package.json';

const packagesPaths = {
  linthtml: 'node_modules/@mate-academy/linthtml-config',
};

const configFileNames = {
  linthtml: '.linthtmlrc.json',
};

const rootDirError = 'Command should be run inside project folder with @mate-academy/scripts as devDependency';

function init() {
  const rootDir = getRootDir();

  hasCorrectDependency(rootDir);
  copyLinthtmlConfig(rootDir);
}

function getRootDir() {
  let rootDir = process.cwd();
  let folderContent = fs.readdirSync(rootDir);

  while (true) {
    if (isRoot(folderContent) && hasCorrectDependency(rootDir)) {
      break;
    }

    if (isSystemRoot(rootDir)) {
      throw new Error(rootDirError);
    }

    rootDir = path.join(rootDir, '../');
    folderContent = fs.readdirSync(rootDir);
  }

  return rootDir;
}

function isRoot(folderContent) {
  return folderContent.includes(packageJson);
}

function hasCorrectDependency(rootDir) {
  let packageFile;

  try {
    packageFile = fs.readFileSync(
      path.join(rootDir, packageJson),
      { encoding: 'utf-8' },
    );
  } catch (e) {
    packageFile = null;
  }

  return (
    packageFile
    && packageFile.devDependencies
    && packageFile.devDependencies['@mate-academy/scripts']
  );
}

function isSystemRoot(rootDir) {
  return rootDir === '/';
}

function copyLinthtmlConfig(rootDir) {
  fs.copyFileSync(
    path.join(rootDir, packagesPaths.linthtml, configFileNames.linthtml),
    path.join(rootDir, configFileNames.linthtml),
  );
}

module.exports = {
  init,
};

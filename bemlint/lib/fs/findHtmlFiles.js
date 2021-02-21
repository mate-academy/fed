'use strict';

const fs = require('fs');
const path = require('path');
const { shouldIgnoreFile } = require('./shouldIgnoreFile');

function findHtmlFiles(dirPath) {
  return fs.readdirSync(dirPath)
    .reduce((acc, dir) => {
      const currentPath = path.join(dirPath, dir);

      if (shouldIgnoreFile(currentPath)) {
        return acc;
      }

      const isDir = fs.statSync(currentPath).isDirectory();

      if (isDir) {
        return [
          ...acc,
          ...findHtmlFiles(currentPath),
        ];
      }

      if (path.extname(currentPath) === '.html') {
        return [
          ...acc,
          {
            path: currentPath,
            content: fs.readFileSync(currentPath, 'utf-8'),
          },
        ];
      }

      return acc;
    }, []);
}

module.exports = {
  findHtmlFiles,
};

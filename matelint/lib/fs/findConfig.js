'use strict';

const { cosmiconfigSync } = require('cosmiconfig');

function findConfig() {
  const configFile = cosmiconfigSync(
    'matelint',
    { stopDir: process.cwd() },
  ).search();

  const config = configFile ? configFile.config : {};

  return config;
}

module.exports = {
  findConfig,
};

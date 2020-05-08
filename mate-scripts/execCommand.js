'use strict';

const { execSync } = require('child_process');

function execCommand(command, shouldBindStdout = true) {
  let options;

  if (shouldBindStdout) {
    options = {
      stdio: 'inherit',
    };
  }
  execSync(command, options);
}

function execCommandSafe(command, shouldBindStdout = true) {
  try {
    execCommand(command, shouldBindStdout);
  } catch (e) {
    process.exit(1);
  }
}

module.exports = {
  execCommand,
  execCommandSafe,
};

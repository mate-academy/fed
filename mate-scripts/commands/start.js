'use strict';

const { spawn } = require('child_process');

function start() {
  spawn('gulp', { stdio: 'inherit' });
}

module.exports = {
  start,
};

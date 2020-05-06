#!/usr/bin/env node

'use strict';

const packageFile = require('./package.json');
const { init } = require('./commands');
const { Command } = require('commander');

const program = new Command();

program
  .name('mate-scripts')
  .version(packageFile.version, '-v --version', 'output current version');

program
  .command('init')
  .description('init linters and configs')
  .action(init);

program.parse(process.argv);

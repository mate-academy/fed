#!/usr/bin/env node

const path = require('path');
const { Command } = require('commander');
const { version } = require('../package.json');
const { matelint } = require('../lib/matelint');

const program = new Command();

program
  .name('matelint')
  .version(version, '-v --version', 'output current version');

program
  .option('[files...]')
  .description('check code style in html')
  .action((_, destination) => (
      matelint(path.join(process.cwd(), ...destination.args))
  ));

program.parse(process.argv);

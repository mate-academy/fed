#!/usr/bin/env node

'use strict';

const { Command } = require('commander');
const packageFile = require('../package.json');
const {
  init,
  start,
  build,
  deploy,
  lint,
  test,
} = require('../commands');

const program = new Command();

function getLintOptions(command) {
  const { styles, html, javascript } = command;

  if (!(styles && html && javascript)) {
    return {
      styles: true,
      html: true,
      javascript: true,
    };
  }

  return { styles, html, javascript };
}

function lintController(command) {
  const options = getLintOptions(command);

  lint(options);
}

program
  .name('mate-scripts')
  .version(packageFile.version, '-v --version', 'output current version');

program
  .command('init')
  .description('init linters and configs')
  .action(init);

program
  .command('start')
  .description('run development server')
  .action(start);

program
  .command('build')
  .description('create production ready build')
  .action(build);

program
  .command('deploy')
  .description('deploy application to gh-pages')
  .action(deploy);

program
  .command('lint')
  .option('-s, --styles', 'lint styles only', false)
  .option('-h, --html', 'lint html only', false)
  .option('-j, --javascript', 'lint javascript only', false)
  .description('lint html, css and js files')
  .action(lintController);

program
  .command('test')
  .description('run tests')
  .action(test);

program.parse(process.argv);

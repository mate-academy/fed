import { Command as Commander } from 'commander';
import packageFile from '../package.json';
import { CommandFactory } from './CommandFactory.js';
import {
  BuildCommand,
  DeployCommand,
  InitCommand,
  LintCommand,
  StartCommand,
  TestCommand,
  UpdateCommand,
} from './commands';
import { lintController } from './controllers';

const program = new Commander();
const commandFactory = new CommandFactory();

program
  .name('mate-scripts')
  .version(packageFile.version, '-v --version', 'output current version');

program
  .command('init')
  .description('init linters and configs')
  .action(commandFactory.make(InitCommand));

program
  .command('start')
  .description('run development server')
  .action(commandFactory.make(StartCommand));

program
  .command('lint [files...]')
  .option('-s, --styles', 'lint styles only', false)
  .option('-h, --html', 'lint html only', false)
  .option('-j, --javascript', 'lint javascript only', false)
  .description('lint html, css and js files')
  .action(commandFactory.make(LintCommand, lintController));

program
  .command('test')
  .description('run tests')
  .action(commandFactory.make(TestCommand));

program
  .command('build')
  .description('create production ready build')
  .action(commandFactory.make(BuildCommand));

program
  .command('deploy')
  .description('deploy application to gh-pages')
  .action(commandFactory.make(DeployCommand));

program
  .command('update')
  .description('update @mate-academy/scripts')
  .action(commandFactory.make(UpdateCommand));

program.parse(process.argv);

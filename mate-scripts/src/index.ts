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
  MigrateCommand,
} from './commands';
import {
  deployController,
  lintController,
  migrateController,
} from './controllers';
import { startController } from './controllers/start.controller.js';

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
  .option('-l, --logs', 'show internal commands logs', false)
  .option('-o, --open', 'open web browser after start', true)
  .description('run development server')
  .action(commandFactory.make(StartCommand, startController));

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
  .option('-l, --logs', 'show internal commands logs', false)
  .description('deploy application to gh-pages')
  .action(commandFactory.make(DeployCommand, deployController));

program
  .command('update')
  .description('update @mate-academy/scripts')
  .action(commandFactory.make(UpdateCommand));


program
  .command('migrate <type>')
  .description('(global) migrate project to @mate-academy/scripts')
  .action(commandFactory.make(MigrateCommand, migrateController, true));

program.parse(process.argv);

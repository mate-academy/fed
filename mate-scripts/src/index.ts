import { Command as Commander } from 'commander';
import packageFile from '../package.json';
import { CommandFactory } from './CommandFactory';
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
  migrateController, testController,
} from './controllers';
import { startController } from './controllers/start.controller';
import { buildController } from './controllers/build.controller';

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
  .option('-p, --port <number>', 'choose port')
  .description('run development server')
  .action(commandFactory.make(StartCommand, startController));

program
  .command('lint [files...]')
  .option('-s, --styles', 'lint styles only', false)
  .option('-h, --html', 'lint html (markup-style) only', false)
  .option('-m, --matelint', 'Mate linter: lint html (markup-style) only', false)
  .option('-b, --bem', 'lint html (BEM) only', false)
  .option('-j, --javascript', 'lint javascript only', false)
  .description('lint html, css and js files')
  .action(commandFactory.make(LintCommand, lintController));

program
  .command('test')
  .option('-n, --not-open', 'should open test report in browser', false)
  .option('-l, --logs', 'should log details to console during run', false)
  .description('run tests')
  .action(commandFactory.make(TestCommand, testController));

program
  .command('build')
  .description('create production ready build')
  .option('-l, --logs', 'show internal commands logs', false)
  .action(commandFactory.make(BuildCommand, buildController));

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

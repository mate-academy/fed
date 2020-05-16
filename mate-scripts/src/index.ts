import { Command as Commander } from 'commander';
import packageFile from '../package.json';
import {
  InitCommand,
  StartCommand,
  BuildCommand,
  DeployCommand,
  LintCommand,
  TestCommand,
  UpdateCommand,
} from './commands';
import { CommandRunner } from './CommandRunner';

const program = new Commander();
const commandRunner = new CommandRunner();

program
  .name('mate-scripts')
  .version(packageFile.version, '-v --version', 'output current version');

program
  .command('init')
  .description('init linters and configs')
  .action(commandRunner.make(InitCommand));

program
  .command('start')
  .description('run development server')
  .action(commandRunner.make(StartCommand));

program
  .command('lint [files...]')
  .option('-s, --styles', 'lint styles only', false)
  .option('-h, --html', 'lint html only', false)
  .option('-j, --javascript', 'lint javascript only', false)
  .description('lint html, css and js files')
  .action(commandRunner.make(LintCommand));

program
  .command('test')
  .description('run tests')
  .action(commandRunner.make(TestCommand));

program
  .command('build')
  .description('create production ready build')
  .action(commandRunner.make(BuildCommand));

program
  .command('deploy')
  .description('deploy application to gh-pages')
  .action(commandRunner.make(DeployCommand));

program
  .command('update')
  .description('update @mate-academy/scripts')
  .action(commandRunner.make(UpdateCommand));

program.parse(process.argv);

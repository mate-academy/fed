import path from 'path';
import { Command } from 'commander';
import { version } from '../package.json';
import { htmlLint } from './htmlLint';

const program = new Command();

program
  .name('html-lint')
  .version(version, '-v --version', 'output current version');

program
  .option('[files...]')
  .description('check code style in html')
  .action((_, destination) => (
    htmlLint(path.join(process.cwd(), ...destination.args))
  ));

program.parse(process.argv);

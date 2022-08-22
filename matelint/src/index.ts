import path from 'path';
import { Command } from 'commander';
import { version } from '../package.json';
import { matelint } from './matelint';

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

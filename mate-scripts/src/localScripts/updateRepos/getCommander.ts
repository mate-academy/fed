import { Command } from 'commander';
import pkg from '../../../package.json';

const defaultMessage = `update ${pkg.name} to ${pkg.version}`;

export interface CommanderOptions {
  scripts: string[],
  message: string,
  types: string[],
  include: string[],
  exclude: string[],
  merge: boolean,
  silent: boolean,
}

export function getCommander(argv: string[]) {
  const commander = new Command();

  commander
    .option('-s, --scripts <items>', 'Bash commands to run inside repo folder', commaSeparatedList, [])
    .option('-m, --message <string>', 'Commit message and PR title', defaultMessage)
    .option('-t, --types, <items>', 'Project types to update', commaSeparatedList, ['layout'])
    .option('-i, --include, <items>', 'Specific projects to update', commaSeparatedList, [])
    .option('-e, --exclude, <items>', 'Specific projects to exclude from update', commaSeparatedList, [])
    .option('--merge', 'Merge pull requests automatically', false)
    .option('--silent', 'Hide internal commands logs', false);

    commander.parse(argv);

  return commander;
}

function commaSeparatedList(value: string) {
  return value.split(',');
}

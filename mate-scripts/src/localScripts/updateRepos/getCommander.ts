import { Command } from 'commander';
import pkg from '../../../package.json';

const defaultMessage = `update ${pkg.name} to ${pkg.version}`;

export interface CommanderOptions {
  scripts: string[];
  message: string;
  types: string[];
  include: string[];
  exclude: string[];
  merge: boolean;
  silent: boolean;
  chunkSize: number;
  mergeOnly: boolean;
}

export function getCommander(argv: string[]) {
  const commander = new Command();

  commander
    .option('-s, --scripts <items>', 'Bash commands to run inside repo folder', parseCommaSeparatedList, [])
    .option('-m, --message <string>', 'Commit message and PR title', defaultMessage)
    .option('-t, --types <items>', 'Project types to update', parseCommaSeparatedList, ['layout'])
    .option('-i, --include <items>', 'Specific projects to update', parseCommaSeparatedList, [])
    .option('-e, --exclude <items>', 'Specific projects to exclude from update', parseCommaSeparatedList, [])
    .option('--merge', 'Merge pull requests automatically', false)
    .option('--silent', 'Hide internal commands logs', false)
    .option('--chunk-size <number>', 'Number of repos to process in parallel', parseInteger, 10)
    .option('--merge-only', 'Merge previously created repos', false);

  commander.parse(argv);

  return commander;
}

function parseCommaSeparatedList(value: string) {
  return value.split(',');
}

function parseInteger(value: string) {
  return Number.parseInt(value);
}

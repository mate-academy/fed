import { cosmiconfigSync } from 'cosmiconfig';
import { LintConfig } from '../htmlLint.typedefs';

export const findConfig = (): LintConfig => {
  const configFile = cosmiconfigSync(
    'html-lint',
    { stopDir: process.cwd() },
  ).search();

  return configFile?.config || {};
};

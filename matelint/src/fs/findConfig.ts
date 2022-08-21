import { cosmiconfigSync } from 'cosmiconfig';
import { MateLintConfig } from '../matelint.typedefs';

export const findConfig = (): MateLintConfig => {
  const configFile = cosmiconfigSync(
    'matelint',
    { stopDir: process.cwd() },
  ).search();

  return configFile?.config || {};
};

import { FileErrors, MateLintConfig, ParsedFile } from '../matelint.typedefs';
import { makeLinter } from './makeLinter';

export const lint = (
  files: ParsedFile[],
  config: MateLintConfig<RegExp>,
): FileErrors[] => {
  const linter = makeLinter(config);

  return files.map(({ path, content }) => ({
    path,
    errors: linter(content),
  }));
};

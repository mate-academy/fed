import { FileErrors, LintConfig, ParsedFile } from '../htmlLint.typedefs';
import { makeLinter } from './makeLinter';

export const lint = (
  files: ParsedFile[],
  config: LintConfig<RegExp>,
): FileErrors[] => {
  const linter = makeLinter(config);

  return files.map(({ path, content }) => ({
    path,
    errors: linter(content),
  }));
};

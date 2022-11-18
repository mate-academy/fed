import { Linter } from './Linter';
import { parseHtml } from './parseHtml';
import { LintConfig, ParsedFile } from '../htmlLint.typedefs';

export const makeLinter = (config: LintConfig<RegExp>) => {
  const linter = new Linter(config);

  return (content: ParsedFile['content']) => {
    const node = parseHtml(content);

    return linter.linter(node);
  };
};

import { LintConfig } from './htmlLint.typedefs';
import { RuleName } from './rules/Rules.typedefs';

const defaultConfig: LintConfig & {
  rules: Required<LintConfig['rules']>;
} = {
  ignore: [
    'node_module',
    'dist',
  ],
  rules: {
    [RuleName.closingBracketLocation]: true,
    [RuleName.maxAttrsPerLine]: 2,
  },
};

export default defaultConfig;

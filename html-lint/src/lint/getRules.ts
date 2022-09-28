import { LintConfig } from '../htmlLint.typedefs';
import { rules } from '../rules';

export const getRules = (config: LintConfig<RegExp>) => rules
  .filter((rule) => config.rules[rule.id]);

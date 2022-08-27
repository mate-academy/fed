import { LintConfig } from '../htmlLint.typedefs';
import { Rule } from '../rules/Rules.typedefs';
import { CheckerContext } from './checker.typedefs';

// Todo: reduce O(n^2) -> O(n) replace flatMap & filter to reduce method

export const makeChecker = (
  rules: Rule[],
  config: LintConfig<RegExp>,
) => (ctx: CheckerContext) => rules
  .flatMap((rule) => rule.check({ ...ctx, config }))
  .filter(Boolean);

import { LintConfig } from '../htmlLint.typedefs';
import { Rule } from '../rules/Rules.typedefs';
import { CheckerContext } from './checker.typedefs';

export const makeChecker = (
  rules: Rule[],
  config: LintConfig<RegExp>,
) => <T = Node>(ctx: CheckerContext<T>) => rules
  .flatMap((rule) => rule.check<T>({ ...ctx, config }))
  .filter(Boolean);

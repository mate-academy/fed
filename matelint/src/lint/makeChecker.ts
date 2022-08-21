import { MateLintConfig } from '../matelint.typedefs';
import { Rule } from '../rules/Rules.typedefs';
import { CheckerContext } from './checker.typedefs';

export const makeChecker = (
  rules: Rule[],
  config: MateLintConfig<RegExp>,
) => <T = Node>(ctx: CheckerContext<T>) => rules
  .flatMap((rule) => rule.check<T>({ ...ctx, config }))
  .filter(Boolean);

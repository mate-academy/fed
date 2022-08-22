import { Node } from 'parse5/dist/tree-adapters/default';
import { LintConfig } from '../htmlLint.typedefs';

export interface CheckerOptions {
  isElement: boolean;
}

export interface CheckerContext<T = Node> {
  node: T;
  config?: LintConfig<RegExp>;
  options?: CheckerOptions;
}

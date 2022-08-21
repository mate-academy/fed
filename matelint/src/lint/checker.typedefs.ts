import { Node } from "parse5/dist/tree-adapters/default";
import { MateLintConfig } from "../matelint.typedefs";

export interface CheckerOptions {
  isElement: boolean;
}

export interface CheckerContext<T = Node> {
  node: T;
  config?: MateLintConfig<RegExp>;
  options?: CheckerOptions;
}

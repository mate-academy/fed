import { Node, Element } from 'parse5/dist/tree-adapters/default';
import { defaultTreeAdapter } from 'parse5';
import { makeChecker } from './makeChecker';
import { getRules } from './getRules';
import { MateLintConfig } from '../matelint.typedefs';
import { RuleError } from '../rules/Rules.typedefs';

export class Linter {
  readonly checker;

  constructor(config: MateLintConfig<RegExp>) {
    this.checker = makeChecker(
      getRules(config),
      config,
    );
  }

  linter = (node: Node): RuleError[] => {
    const errors = defaultTreeAdapter.isElementNode(node)
      ? this.checker<Element>({ node })
      : [];

    if ('childNodes' in node) {
      const childNodesErrors: RuleError[] = node.childNodes
        .map(this.linter)
        .flat();

      return [
        ...errors,
        ...childNodesErrors,
      ];
    }

    return errors;
  };
}

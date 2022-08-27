import { Node } from 'parse5/dist/tree-adapters/default';
import { makeChecker } from './makeChecker';
import { getRules } from './getRules';
import { LintConfig } from '../htmlLint.typedefs';
import { RuleError } from '../rules/Rules.typedefs';

export class Linter {
  readonly checker: ReturnType<typeof makeChecker>;

  constructor(config: LintConfig<RegExp>) {
    this.checker = makeChecker(
      getRules(config),
      config,
    );
  }

  linter = (node: Node): RuleError[] => {
    const errors = this.checker({ node });

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

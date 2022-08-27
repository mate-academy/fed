import { Node } from 'parse5/dist/tree-adapters/default';
import { CheckerContext } from '../lint/checker.typedefs';

export enum RuleName {
  closingBracketLocation = 'closing-bracket-location',
  maxAttrsPerLine = 'max-attrs-per-line'
}

export interface LintRules {
  [RuleName.closingBracketLocation]?: boolean;
  [RuleName.maxAttrsPerLine]?: number;
}

export interface RuleErrorContent {
  id: RuleName;
  node: Node;
  massage: string;
}

export type RuleError = RuleErrorContent | null;

export interface Rule<T = Node> {
  id: keyof LintRules;
  check: (ctx: CheckerContext<T>) => RuleError;
}

import { Node } from 'parse5/dist/tree-adapters/default';
import { CheckerContext } from '../lint/checker.typedefs';

export enum RuleName {
  closingAndOpeningOnSemeLevel = 'closing-and-opening-on-seme-level',
}

export interface MateLintRules {
  [RuleName.closingAndOpeningOnSemeLevel]?: boolean;
}

export enum RuleType {
  Indent = 'Indent',
}

export interface RuleErrorContent {
  id: RuleName;
  node: Node;
  massage: string;
}

export type RuleError = RuleErrorContent | null;

export interface Rule {
  id: keyof MateLintRules;
  type: RuleType;
  check: <T = Node>(ctx: CheckerContext<T>) => RuleError;
}

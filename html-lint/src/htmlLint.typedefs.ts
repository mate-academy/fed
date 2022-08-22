import { LintRules, RuleError } from './rules/Rules.typedefs';

export interface LintConfig<T = string> {
  ignore: T[];
  rules: LintRules;
}

export interface ParsedFile {
  path: string;
  content: string;
}

export interface FileErrors {
  path: string;
  errors: RuleError[];
}

export interface FormattedError {
  massage: string;
  ruleId: string;
  startLine?: number;
  startCol?: number;
}

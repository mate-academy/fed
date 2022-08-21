import { MateLintRules, RuleError } from "./rules/Rules.typedefs";

export interface MateLintConfig<T = string> {
  ignore: T[];
  rules: MateLintRules;
}

export interface ParsedFile {
  path: string,
  content: string
}

export interface FileErrors {
  path: string,
  errors: RuleError[],
}

export interface FormatedError {
  massage: string,
  ruleId: string,
  startLine?: number,
  startCol?: number,
}

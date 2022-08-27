import { Rule } from './Rules.typedefs';
import closingBracketLocation from './closing-bracket-location';
import maxAttrsPerLine from './max-attrs-per-line';

export const rules: Rule<any>[] = [
  closingBracketLocation,
  maxAttrsPerLine,
];

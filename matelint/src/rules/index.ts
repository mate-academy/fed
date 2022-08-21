import closing_and_opening_on_seme_level from './closing-and-opening-on-seme-level';
import { Rule } from './Rules.typedefs';

export const rules: Rule[] = [
  closing_and_opening_on_seme_level,
];

// if (process.env.__DEV__) {
//   module.exports = [
//     require('./closing-and-opening-on-seme-level'),
//     require('./max-attrs-count-in-line'),
//     require('./indents-for-attrs'),
//   ]
// }

import { MateLintConfig } from "../matelint.typedefs";
import { rules } from "../rules";

export const getRules = (config: MateLintConfig<RegExp>) => rules
  .filter(rule => config.rules[rule.id]);

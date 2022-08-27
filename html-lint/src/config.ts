import { findConfig } from './fs/findConfig';
import defaultConfig from './defaultConfig';
import { LintConfig } from './htmlLint.typedefs';

const config: LintConfig = findConfig();

const convertStringsToRegExps = (
  values: string[],
): RegExp[] => values.map((pattern) => (
  new RegExp(
    pattern
      .replace(/\*\*/g, `[^/]+`)
      .replace(/\*/, '[^/]+\\'),
  )
));

const mergedConfig: LintConfig<RegExp> = {
  ...defaultConfig,
  ...config,
  ignore: convertStringsToRegExps(config.ignore || defaultConfig.ignore),
  rules: {
    ...defaultConfig.rules,
    ...config.rules,
  },
};

export default mergedConfig;

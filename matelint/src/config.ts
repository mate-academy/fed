import { findConfig } from './fs/findConfig';
import defaultConfig from './defaultConfig';
import {MateLintConfig} from "./matelint.typedefs";

const config: MateLintConfig = findConfig();

const convertStringsToRegExps = (
  values: string[]
): RegExp[] => values.map(pattern => (
  new RegExp(
    pattern
      .replace(/\*\*/g, `[^/]+`)
      .replace(/\*/, '[^/]+\\'),
  )
))

const mergedConfig: MateLintConfig<RegExp> = {
  ...defaultConfig,
  ...config,
  ignore: convertStringsToRegExps(config.ignore || defaultConfig.ignore),
  rules: config.rules || defaultConfig.rules,
};

export default mergedConfig;

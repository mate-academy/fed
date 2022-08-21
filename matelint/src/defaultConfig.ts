import { MateLintConfig } from './matelint.typedefs';

const defaultConfig: MateLintConfig = {
  ignore: [
    'node_module',
    'dist',
  ],
  rules: {
    'closing-and-opening-on-seme-level': true,
    // 'max-attrs-count-in-line': 2,
    // 'indents-for-attrs': true,
  },
};

export default defaultConfig;

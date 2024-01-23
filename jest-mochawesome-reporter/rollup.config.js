const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const pkg = require('./package.json');

module.exports = {
  input: './src/jest-mochawesome.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    'fs',
    'path',
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
};

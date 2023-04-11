const fs = require('fs');
const path = require('path');

const dirPath = `${__dirname}/rules`;

const ruleFiles = fs
  .readdirSync(dirPath)
  .filter((file) => file !== 'index.js' && !file.endsWith('test.js'));

const rules = Object.fromEntries(
  ruleFiles.map((file) => [path.basename(file, '.js'), require(`./${file}`)]),
);

module.exports = { 
  rules,
  recommended: {
    plugins: ['mate-custom-rules'],
    rules: {
      'mate-custom-rules/consistent-enum-member-casing': 'warn',
      'mate-custom-rules/use-prefixed-boolean-constants': ['error', [
        {
          prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'are'],
          format: 'PascalCase',
        },
        {
          prefix: ['IS_', 'SHOULD_', 'HAS_', 'CAN_', 'DID_', 'WILL_', 'ARE_'],
          format: 'UPPER_CASE',
        },
      ]],
    }
  }
};

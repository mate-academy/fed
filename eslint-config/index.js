"use strict";

module.exports = {
  "extends": "standard",
  "env": {
    "node": true,
  },
  "rules": {
    "max-len": ["error", {
      "code": 80,
      "comments": 80
    }],
    "semi": ["error", "always"],
    "semi-style": ["error", "last"],
    "strict": "error",
    "space-before-function-paren": ["error", "never"],
    "no-var": "error",
    "prefer-const": "error",
    "comma-dangle": ["error", "always-multiline"],
    "curly": ["error", "all"],
    "no-shadow": ["error", {"builtinGlobals": true, "hoist": "all", "allow": []}],
    "no-redeclare": ["error", { "builtinGlobals": true }],
    "no-param-reassign": "error",
    "operator-linebreak": ["error", "before"],
    "no-console": "error",
    "standard/no-callback-literal": 0,
    "import/prefer-default-export": 0,
  },
  "parserOptions": {
    "sourceType": "script"
  },
};

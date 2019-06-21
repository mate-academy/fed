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
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        "message": "Unexpected property on console object was called"
      }
    ],
  },
  "parserOptions": {
    "sourceType": "script"
  },
};

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
  },
  "parserOptions": {
    "sourceType": "script"
  },
};

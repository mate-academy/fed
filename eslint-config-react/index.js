"use strict";

module.exports = {
  "extends": ["airbnb", "@mate-academy/eslint-config"],
  "env": {
    "es6": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "plugins": [
    "react",
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-console": "error",
    "no-param-reassign": [2, { "props": true }],
    "no-shadow": ["error", { "builtinGlobals": false }],
    "react/destructuring-assignment": 0,
    "jsx-a11y/label-has-for": [2, {
      "components": ["Label"],
      "required": {
        "some": ["id", "nesting"]
      },
      "allowChildren": true
    }],
    "jsx-a11y/label-has-associated-control": [2, { assert: "either" }],
    "padding-line-between-statements": [
      "error",
      {"blankLine": "always", "prev": "*", "next": "return"},
      {"blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
      {"blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"]},
      {"blankLine": "always", "prev": "directive", "next": "*"},
      {"blankLine": "always", "prev": "block-like", "next": "*"},
    ],
    "import/prefer-default-export": 0
  }
};

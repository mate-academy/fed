"use strict";

module.exports = {
  "extends": [
    "stylelint-config-recommended-scss",
  ],
  plugins: [
    "stylelint-scss"
  ],
  "rules": {
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-no-invalid-hex": true,

    "number-leading-zero": "always",
    "number-max-precision": 2,
    "number-no-trailing-zeros": true,

    "string-quotes": "double",

    "length-zero-no-unit": true,

    "unit-case": "lower",
    "unit-no-unknown": [true, {"ignoreUnits": ["fr"]}],

    "value-keyword-case": "lower",
    "value-list-comma-space-after": "always-single-line",
    "value-list-comma-newline-after": "always-multi-line",
    "value-list-max-empty-lines": 0,

    "shorthand-property-no-redundant-values": true,

    "property-case": "lower",
    "property-no-unknown": true,

    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",

    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-semicolon-newline-after": "always",
    "declaration-block-trailing-semicolon": "always",

    "block-closing-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always",
    "block-opening-brace-newline-after": "always",
    "block-opening-brace-newline-before": "never-single-line",
    "block-opening-brace-space-before": "always",
    "block-no-empty": true,

    "selector-attribute-brackets-space-inside": "never",
    "selector-attribute-operator-space-after": "never",
    "selector-attribute-operator-space-before": "never",
    "selector-attribute-quotes": "always",
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-descendant-combinator-no-non-space": true,
    "selector-max-id": 1,
    "selector-max-universal": 1,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-class-parentheses-space-inside": "never",
    "selector-pseudo-element-case": "lower",
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,

    "selector-list-comma-newline-after": "always",

    "rule-empty-line-before": ["always", {ignore: ["after-comment", "first-nested", "inside-block"]}],

    "media-feature-name-case": "lower",
    "media-feature-name-no-unknown": true,

    "at-rule-name-case": "lower",

    "comment-no-empty": true,

    "indentation": 2,
    "max-empty-lines": 1,
    "max-line-length": 80,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": true
  }
};

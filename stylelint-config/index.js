"use strict";

module.exports = {
  "extends": [
    "stylelint-config-standard-scss",
  ],
  plugins: [
    "stylelint-scss"
  ],
  rules: {
    "number-max-precision": 2,

    "unit-no-unknown": [true, {"ignoreUnits": ["fr"]}],

    "declaration-empty-line-before": ["always", {
      except: ["first-nested"],
      ignore: ["after-comment", "after-declaration", "inside-single-line-block"]
    }],

    "selector-max-id": 1,
    "selector-max-universal": 1,

    "rule-empty-line-before": ["always", {ignore: ["after-comment", "first-nested", "inside-block"]}],

    "media-feature-name-case": "lower",
    "media-feature-range-notation": "prefix"
  },
};

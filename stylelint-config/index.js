"use strict";

module.exports = {
  "extends": [
    "stylelint-config-standard-scss",
  ],
  plugins: [
    "stylelint-scss"
  ],
  rules: {
    "declaration-empty-line-before": ["always", {
      except: ["first-nested"],
      ignore: ["after-comment", "after-declaration", "inside-single-line-block"]
    }],
    "function-url-quotes": null,
    "media-feature-range-notation": "prefix",
    "number-max-precision": 2,
    "rule-empty-line-before": ["always", {
      ignore: ["after-comment", "first-nested", "inside-block"]
    }],
    "selector-max-id": 0,
    "selector-max-universal": 0,
    "unit-no-unknown": [true, {"ignoreUnits": ["fr"]}],
  },
};

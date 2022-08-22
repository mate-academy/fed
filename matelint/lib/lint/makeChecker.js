'use strict';

function makeChecker(rules, config) {
  return ctx => {
    return rules
      .map((rule) => {
        return rule.check({...ctx, config});
      })
      .flat()
      .filter(Boolean);
  };
}

module.exports = {
  makeChecker,
};

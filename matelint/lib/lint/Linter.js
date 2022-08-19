'use strict';

const { makeChecker } = require('./makeChecker');
const { getRules } = require('./getRules');

class Linter {
  constructor(config) {
    this.checker = makeChecker(
      getRules(config),
      config,
    );
  }

  linter(node, parentBlocks = []) {
    const errors = this.checker({
      node,
      parentBlocks,
    });

    if (node.childNodes) {
      const childNodesErrors = node.childNodes
        .map(child => this.linter(child, parentBlocks))
        .flat();

      return [
        ...errors,
        ...childNodesErrors,
      ];
    }

    return errors;
  }
}

module.exports = {
  Linter,
};

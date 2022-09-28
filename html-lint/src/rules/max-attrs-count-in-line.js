module.exports = {
  id: 'max-attrs-count-in-line',
  type: 'tag',
  check({ node, config }) {
    const maxInLine = config.rules['max-attrs-count-in-line'];

    if (
      node.nodeName.startsWith('#')
            || !node?.attrs
            || node.attrs.length <= maxInLine
    ) {
      return null;
    }

    const attrsLines = Object.entries(node.sourceCodeLocation.attrs)
      .map((attr) => attr[1].startLine);

    if ([...new Set(attrsLines)].length !== attrsLines.length) {
      return {
        id: this.id,

        node,
        massage: `Max attrs count in one line is ${maxInLine}`,
      };
    }

    return null;
  },
};

module.exports = {
  rules: {
    'no-window-outside-useeffect': {
      create(context) {
        let isInUseEffect = false;

        return {
          CallExpression(node) {
            if (node.callee.type === 'Identifier' && node.callee.name === 'useEffect') {
              isInUseEffect = true;
            }
          },
          Identifier(node) {
            if (node.name === 'window' && !isInUseEffect) {
              context.report({
                node,
                message: 'Do not use window outside of a useEffect hook'
              });
            }
          },
          'CallExpression:exit'(node) {
            if (node.callee.type === 'Identifier' && node.callee.name === 'useEffect') {
              isInUseEffect = false;
            }
          }
        };
      }
    }
  }
};

module.exports = {
  rules: {
    'no-window-outside-useeffect': {
      create: function(context) {
        return {
          Identifier(node) {
            if (
              node.name === 'window' &&
              !isWithinUseEffectHook(node) &&
              isWithinFunctionComponent(node)
            ) {
              context.report({
                node,
                message: 'Do not use `window` outside of the `useEffect` hook in function components.'
              });
            }
          }
        };
      }
    }
  }
};

function isWithinUseEffectHook(node) {
  let parent = node.parent;
  while (parent) {
    if (
      parent.type === 'CallExpression' &&
      parent.callee.name === 'useEffect'
    ) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

function isWithinFunctionComponent(node) {
  let parent = node.parent;
  while (parent) {
    if (
      parent.type === 'FunctionDeclaration' ||
      parent.type === 'FunctionExpression' ||
      parent.type === 'ArrowFunctionExpression'
    ) {
      if (parent.parent.type === 'ExportDefaultDeclaration') {
        return true;
      }
      return false;
    }
    parent = parent.parent;
  }
  return false;
}

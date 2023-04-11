module.exports = {
  meta: {
    type: 'problem',
    messages: {
      noVariableDeclarations: 'Do not use variable declarations (const, let, or var), classes, or functions in this file.',
    },
    schema: [],
  },
  create(context) {
    return {
      VariableDeclaration(node) {
        context.report({
          node,
          messageId: 'noVariableDeclarations',
        });
      },
      FunctionDeclaration(node) {
        context.report({
          node,
          messageId: 'noVariableDeclarations',
        });
      },
      ClassDeclaration(node) {
        context.report({
          node,
          messageId: 'noVariableDeclarations',
        });
      },
    };
  },
};

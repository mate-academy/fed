module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      useDecorators: 'Use TypeScript class decorators from "@/core/decorators" instead of calling the deprecated "make" function.',
    },
    schema: [],
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (
          node.declaration
          && node.declaration.type === 'VariableDeclaration'
          && node.declaration.declarations[0].init
          && node.declaration.declarations[0].init.callee
          && /^make/.test(node.declaration.declarations[0].init.callee.name)
        ) {
          context.report({
            node,
            messageId: 'useDecorators',
          });
        }
      },
    };
  },
};

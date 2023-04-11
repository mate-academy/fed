module.exports = {
  meta: {
    type: 'problem',
    messages: {
      noTypeDeclarations: 'Do not use type, enum, or interface declarations in this file.',
    },
    schema: [],
  },
  create(context) {
    return {
      TSTypeAliasDeclaration(node) {
        context.report({
          node,
          messageId: 'noTypeDeclarations',
        });
      },
      TSEnumDeclaration(node) {
        context.report({
          node,
          messageId: 'noTypeDeclarations',
        });
      },
      TSInterfaceDeclaration(node) {
        context.report({
          node,
          messageId: 'noTypeDeclarations',
        });
      },
    };
  },
};

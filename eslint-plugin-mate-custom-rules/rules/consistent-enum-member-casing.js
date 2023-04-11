module.exports = {
  meta: {
    type: 'problem',
    messages: {
      mixedCasing: 'Enum member keys must be either all CamelCase or all UPPER_CASE.',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      TSEnumDeclaration(node) {
        let camelCaseMembers = 0;
        let upperCaseMembers = 0;

        node.members.forEach((member) => {
          const key = member.id.name;

          if (key === key.toUpperCase()) {
            upperCaseMembers += 1;

            return;
          }

          camelCaseMembers += 1;
        });

        if (camelCaseMembers > 0 && upperCaseMembers > 0) {
          context.report({
            node,
            messageId: 'mixedCasing',
            fix(fixer) {
              const shouldConvertToCamelCase = (
                camelCaseMembers >= upperCaseMembers
              );

              const fixes = node.members.map((member) => {
                const key = member.id.name;
                let newKey;

                if (shouldConvertToCamelCase) {
                  newKey = key === key.toUpperCase()
                    ? key
                      .split('_')
                      .map((word) => (
                        word[0].toUpperCase() + word.slice(1).toLowerCase()
                      ))
                      .join('')
                    : key;
                } else {
                  newKey = key !== key.toUpperCase()
                    ? key
                      .split(/(?=[A-Z])/)
                      .map((word) => word.toUpperCase())
                      .join('_')
                    : key;
                }

                return fixer.replaceText(member.id, newKey);
              });

              return fixes;
            },
          });
        }
      },
    };
  },
};

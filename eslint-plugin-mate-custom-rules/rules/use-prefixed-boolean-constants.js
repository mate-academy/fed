function checkFormat(name, format) {
  const camelCase = /^[a-z][a-zA-Z]*$/;
  const strictCamelCase = /^[a-z][a-z0-9]*$/;
  const pascalCase = /^[A-Z][a-zA-Z]*$/;
  const strictPascalCase = /^[A-Z][a-z0-9]*$/;
  const snakeCase = /^[a-z0-9]+(_[a-z0-9]+)*$/;
  const upperCase = /^[A-Z0-9]+(_[A-Z0-9]+)*$/;

  switch (format) {
    case 'camelCase':
      return camelCase.test(name);
    case 'strictCamelCase':
      return strictCamelCase.test(name);
    case 'PascalCase':
      return pascalCase.test(name);
    case 'StrictPascalCase':
      return strictPascalCase.test(name);
    case 'snake_case':
      return snakeCase.test(name);
    case 'UPPER_CASE':
      return upperCase.test(name);
    default:
      return false;
  }
}

function formatMessage(formats) {
  return formats.replace(/,([^,]*)$/, ' or$1');
}

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      incorrectPrefixOrFormat: 'Boolean constant "{{name}}" must start with one of the allowed prefixes and be in the specified format: {{formats}}.',
    },
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            prefix: {
              type: 'array',
              items: { type: 'string' },
            },
            format: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    ],
  },
  create(context) {
    const options = context.options[0] || [];

    function checkName(name) {
      // eslint-disable-next-line no-restricted-syntax
      for (const option of options) {
        const { prefix, format } = option;

        // eslint-disable-next-line no-restricted-syntax
        for (const p of prefix) {
          if (name.startsWith(p) && checkFormat(name.slice(p.length), format)) {
            return true;
          }
        }
      }

      return false;
    }

    return {
      VariableDeclaration(node) {
        if (node.kind !== 'const') {
          return;
        }

        node.declarations.forEach((declaration) => {
          if (
            declaration.init
            && declaration.init.type === 'Literal'
            && typeof declaration.init.value === 'boolean'
          ) {
            const { name } = declaration.id;

            if (!checkName(name)) {
              const formats = options
                .map((option) => (
                  `[${option.prefix.map((p) => `'${p}'`).join(', ')}] and format: ${option.format}`
                ))
                .join(', ');

              context.report({
                node: declaration,
                messageId: 'incorrectPrefixOrFormat',
                data: {
                  name,
                  formats: formatMessage(formats),
                },
              });
            }
          }
        });
      },
    };
  },
};

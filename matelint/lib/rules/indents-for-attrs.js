'use strict';

module.exports = {
    id: 'indents-for-attrs',
    type: 'indents',
    check({ node, config }) {
        const maxInLine = config.rules['max-attrs-count-in-line'] || 2;

        if (
            node.nodeName.startsWith("#")
            || !node?.attrs
            || node.attrs.length <= maxInLine
        ) {
            return null;
        }

        const attrsCols = Object.values(node.sourceCodeLocation.attrs)
            .map(attr => {
                return attr.startCol;
            })

        const errors = attrsCols.reduce((acc, attrCol) => {
           if (attrCol - node.sourceCodeLocation.startCol !== 2) {
               return [
                   ...acc,
                   {
                       id: this.id,
                       node,
                       massage: `Attr must have indents = 2`,
                   }
               ]
           }

           return acc;
        }, []);

        return errors.length
          ? errors
          : null;
    },
};

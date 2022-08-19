'use strict';

module.exports = {
    id: 'closing-and-opening-on-seme-level',
    type: 'indent',
    check({ node }) {
        console.log(node.type);

        if (!node.sourceCodeLocation?.startTag) {
            return null;
        }

        const loc = node.sourceCodeLocation;

        const start = loc.startTag.startCol;
        const end = loc.endTag
            ? loc.endTag.startCol
            : loc.endCol - 1;

        if (start - end && loc.startLine !== loc.endLine) {
            return {
                id: this.id,
                node,
                massage: `Tag’s closing bracket should be on the same level as opening one`,
            };
        }
    },
};

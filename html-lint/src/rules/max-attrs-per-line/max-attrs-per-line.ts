import { Element } from 'parse5/dist/tree-adapters/default';
import { Rule, RuleName } from '../Rules.typedefs';
import defaultConfig from '../../defaultConfig';

const maxAttrsPerLine: Rule<Element> = {
  id: RuleName.maxAttrsPerLine,
  check({
    node,
    config,
  }) {
    const maxInLine = config?.rules[RuleName.maxAttrsPerLine]
      || defaultConfig.rules[RuleName.maxAttrsPerLine];

    const nodeLocation = node.sourceCodeLocation;

    if (!nodeLocation?.attrs || node.attrs.length <= maxInLine) {
      return null;
    }

    const attrsLocations = Object.entries(nodeLocation.attrs);

    const attrsLines = attrsLocations
      .map(([, attrLoc]) => attrLoc.startLine);

    const isManyAttrsInSameLime
      = [...new Set(attrsLines)].length !== attrsLines.length;

    const hasIncorrectIndents = attrsLocations.some(
      ([, location]) => {
        const inSameLineWithTag
          = location.startLine === nodeLocation?.startLine;

        const haveCorrectIndents
          = location.startCol - (nodeLocation?.startCol || 0) !== 2;

        return inSameLineWithTag || haveCorrectIndents;
      },
    );

    const tagStartLocation = `L${nodeLocation.startLine}:C:${nodeLocation.startCol}`;

    if (isManyAttrsInSameLime || hasIncorrectIndents) {
      return {
        id: this.id,
        node,
        massage: `The HTML-element <${node.nodeName}> started at ${tagStartLocation} has number of attributes is more than ${maxInLine} in one line.`
          + 'Start each one, including the first, on the new line with 2-space indentation related to tag.',
      };
    }

    return null;
  },
};

export default maxAttrsPerLine;

import { Element } from 'parse5/dist/tree-adapters/default';
import { ElementLocation } from 'parse5/dist/common/token';
import { Rule, RuleName } from '../Rules.typedefs';
import { isElement, isSelfClosingElement } from '../../utils/parse.utils';

const isOneLineTag = (loc: ElementLocation) => {
  if (loc.endTag) {
    return loc.startLine === loc.endTag.endLine;
  }

  return loc.startLine === loc.endLine;
};

const closingBracketLocationRule: Rule<Element> = {
  id: RuleName.closingBracketLocation,
  check({ node }) {
    const loc = node.sourceCodeLocation;

    if (!isElement(node) || !loc || isOneLineTag(loc)) {
      return null;
    }

    if (isSelfClosingElement(node) && loc.startCol - loc.endCol - 1) {
      return {
        id: this.id,
        node,
        massage: `Tag’s closing bracket should be on the same level as opening one (expected column ${loc.startCol})`,
      };
    }

    if (loc.endTag?.startCol && loc.startCol - loc.endTag.startCol) {
      return {
        id: this.id,
        node,
        massage: `Tag’s closing bracket should be on the same level as opening one (expected column ${loc.startCol})`,
      };
    }

    return null;
  },
};

export default closingBracketLocationRule;

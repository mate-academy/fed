import { Rule, RuleName, RuleType } from "./Rules.typedefs";
import { Element } from "parse5/dist/tree-adapters/default";
import { CheckerContext } from "../lint/checker.typedefs";

export default <Rule>{
  id: RuleName.closingAndOpeningOnSemeLevel,
  type: RuleType.Indent,
  check<T extends Element>({
    node,
  }: CheckerContext<T>) {
    const loc = node.sourceCodeLocation;

    if (!(loc && 'startTag' in loc)) {
      return null;
    }

    const end = loc.endTag
        ? loc.endTag.startCol
        : loc.endCol - 1;

    if (loc.startCol - end && loc.startLine !== loc.endLine) {
        return {
            id: this.id,
            node,
            massage: `Tag’s closing bracket should be on the same level as opening one`,
        };
    }

    return null;
  },
};

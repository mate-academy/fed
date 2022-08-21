import { Node } from "parse5/dist/tree-adapters/default";
import { FormatedError } from "../matelint.typedefs";

interface Args {
  massage: string;
  id: string;
  node: Node;
}

export const formatError = (
  { massage, id, node }: Args
): FormatedError => ({
  massage,
  ruleId: id,
  startLine: node.sourceCodeLocation?.startLine,
  startCol: node.sourceCodeLocation?.startCol,
});

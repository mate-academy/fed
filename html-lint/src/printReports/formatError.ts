import { Node } from 'parse5/dist/tree-adapters/default';
import { FormattedError } from '../htmlLint.typedefs';

interface Args {
  massage: string;
  id: string;
  node: Node;
}

export const formatError = (
  { massage, id, node }: Args,
): FormattedError => ({
  massage,
  ruleId: id,
  startLine: node.sourceCodeLocation?.startLine,
  startCol: node.sourceCodeLocation?.startCol,
});

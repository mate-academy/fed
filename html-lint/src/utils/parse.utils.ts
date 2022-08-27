import { defaultTreeAdapter } from 'parse5';
import { Element, Node } from 'parse5/dist/tree-adapters/default';

export const isElement
  = (node: Node) => defaultTreeAdapter.isElementNode(node);

export const isSelfClosingElement
  = (element: Element) => !element.sourceCodeLocation?.endTag;

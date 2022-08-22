import { parse } from 'parse5';
import { Node } from 'parse5/dist/tree-adapters/default';
import { ParsedFile } from '../matelint.typedefs';

const parseConfig = {
  sourceCodeLocationInfo: true,
};

export const parseHtml = (
  html: ParsedFile['content'],
): Node => parse(html, parseConfig);

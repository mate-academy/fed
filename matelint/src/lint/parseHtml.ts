import { ParsedFile } from "../matelint.typedefs";
import { parse } from 'parse5';
import { Node } from "parse5/dist/tree-adapters/default";

const parseConfig = {
  sourceCodeLocationInfo: true,
};

export const parseHtml = (
  html: ParsedFile["content"]
): Node => parse(html, parseConfig);


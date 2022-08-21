import { Linter } from "./Linter";
import { parseHtml } from "./parseHtml";
import { MateLintConfig, ParsedFile } from "../matelint.typedefs";

export const makeLinter = (config: MateLintConfig<RegExp>) => {
  const linter = new Linter(config);

  return (content: ParsedFile["content"] ) => {
    const node = parseHtml(content);

    return linter.linter(node);
  };
};

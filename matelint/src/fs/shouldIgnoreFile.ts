import config from '../config';
import * as stream from "stream";

export const shouldIgnoreFile = (pathToFile: string) => (
  config.ignore.some(regExp => regExp.test(pathToFile))
);

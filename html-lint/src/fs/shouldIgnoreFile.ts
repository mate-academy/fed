import config from '../config';

export const shouldIgnoreFile = (pathToFile: string) => (
  config.ignore.some((regExp) => regExp.test(pathToFile))
);

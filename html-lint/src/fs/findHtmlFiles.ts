import fs from 'fs';
import path from 'path';
import { shouldIgnoreFile } from './shouldIgnoreFile';
import { ParsedFile } from '../htmlLint.typedefs';

const readFile = (filePath: string): ParsedFile[] => {
  if (path.extname(filePath) !== '.html') {
    return [];
  }

  return [{
    path: filePath,
    content: fs.readFileSync(filePath, 'utf-8'),
  }];
};

export const findHtmlFiles = (startPath: string): ParsedFile[] => {
  if (shouldIgnoreFile(startPath)) {
    return [];
  }

  if (fs.statSync(startPath).isFile()) {
    return readFile(startPath);
  }

  return fs.readdirSync(startPath)
    .reduce<ParsedFile[]>((acc, dir) => ([
      ...acc,
      ...findHtmlFiles(path.join(startPath, dir)),
    ]), []);
};

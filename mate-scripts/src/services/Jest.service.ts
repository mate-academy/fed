import path from 'path';
import { execBashCode, getRootDir } from '../tools';

export class JestService {
  private readonly binDir = path.join(getRootDir(), 'node_modules/.bin/');

  once() {
    return execBashCode(`${this.binDir}jest ./`);
  }

  watch() {
    return execBashCode(`${this.binDir}jest ./ --watch`);
  }
}

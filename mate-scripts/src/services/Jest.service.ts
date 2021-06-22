import path from 'path';
import { execBashCodeSync, getRootDir } from '../tools';

export class JestService {
  private readonly binDir = path.join(getRootDir(), 'node_modules/.bin/');

  once() {
    return execBashCodeSync(`${this.binDir}jest ./`);
  }

  watch() {
    return execBashCodeSync(`${this.binDir}jest ./ --watch`);
  }
}

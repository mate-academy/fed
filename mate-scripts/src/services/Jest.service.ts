import path from 'path';
import { execBashCodeAsyncWithOutput, execBashCodeSync, getRootDir } from '../tools';

export class JestService {
  private readonly binDir = path.join(getRootDir(), 'node_modules/.bin/');

  once() {
    return execBashCodeSync(`${this.binDir}jest ./ --runInBand --passWithNoTests`);
  }

  watch() {
    return execBashCodeSync(`${this.binDir}jest ./ --watch`);
  }

  onceAsync() {
    return execBashCodeAsyncWithOutput(`${this.binDir}jest ./ --passWithNoTests`);
  }
}

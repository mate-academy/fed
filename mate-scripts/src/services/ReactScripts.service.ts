import path from 'path';
import { execBashCodeSync, getRootDir } from '../tools';

export class ReactScriptsService {
  private readonly binDir = path.join(getRootDir(), 'node_modules/.bin/');

  start() {
    return execBashCodeSync(`${this.binDir}react-scripts start`);
  }

  build() {
    return execBashCodeSync(`${this.binDir}react-scripts build`);
  }
}

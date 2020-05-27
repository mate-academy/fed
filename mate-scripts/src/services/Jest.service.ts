import { execBashCode } from '../tools';

export class JestService {
  once() {
    return execBashCode('npx jest ./');
  }

  watch() {
    return execBashCode('npx jest ./ --watch');
  }
}

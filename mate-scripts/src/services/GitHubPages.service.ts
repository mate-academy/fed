import path from 'path';
import { execBashCodeSync } from '../tools';

export class GitHubPagesService {
  private readonly binDir = path.join(this.rootDir, 'node_modules/.bin/');

  constructor(private readonly rootDir: string) {
  }

  deploy(
    distPath = 'build',
  ) {
    execBashCodeSync(`${this.binDir}gh-pages -d ${distPath}`);
  }
}

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { Command } from './Command';

export class BuildCommand extends Command {
  async run(): Promise<void> {
    fs.removeSync(path.join(this.rootDir, 'dist'));

    execSync('gulp build', { stdio: 'inherit' });
  }
}

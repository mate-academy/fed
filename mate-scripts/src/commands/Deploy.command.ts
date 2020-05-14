import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { BuildCommand } from './Build.command';
import { Command } from './Command';

export class DeployCommand extends Command {
  static requiredCommands = [BuildCommand];

  async run(): Promise<void> {
    fs.copySync(
      path.join(this.rootDir, './backstop_data/html_report'),
      path.join(this.rootDir, './dist/report/html_report'),
    );

    execSync(`git add ${path.join(this.rootDir, './dist')} -f`, { stdio: 'inherit' });
    execSync('git commit -m "make build" --no-verify', { stdio: 'inherit' });

    try {
      execSync('git push --delete origin gh-pages');
    } catch (e) {
      // do nothing
    }

    execSync('git subtree push --prefix dist origin gh-pages', { stdio: 'inherit' });
    execSync('git reset --soft HEAD^', { stdio: 'inherit' });

    fs.removeSync(path.join(this.rootDir, 'dist'));
  }
}

import fs from 'fs-extra';
import path from 'path';
import { Backstop } from '../Backstop.js';
import { DESTINATION_DIR } from '../constants.js';
import { execBashCode, execBashCodeSafely } from '../tools/execBashCode.js';
import { BuildCommand } from './Build.command';
import { Command } from './Command';

export class DeployCommand extends Command {
  private readonly buildCommand = this.child<BuildCommand>(BuildCommand);

  private readonly destinationDir = path.join(this.rootDir, DESTINATION_DIR);

  private readonly backstop = new Backstop(this.rootDir);

  protected common() {
  }

  protected layout = async (): Promise<void> => {
    await this.buildCommand.run();

    console.log('Start deploy to gh-pages\n');

    try {
      this.copyHtmlReport();
      this.commitBuild();

      DeployCommand.ensureCanPush();
      DeployCommand.pushGhPagesSubtree();

      console.log('Deployed to gh-pages successfully\n');
    } catch (error) {
      console.log('Error during deploy to gh-pages:');
      console.error(error.message);
    } finally {
      this.clean();
    }
  };

  private copyHtmlReport() {
    fs.copySync(
      path.join(this.backstop.htmlReportDir),
      path.join(this.destinationDir, './report/html_report'),
    );
  }

  private commitBuild() {
    execBashCode(`git add ${this.destinationDir} -f`, false);
    execBashCode('git commit -m "make build" --no-verify', false);
  }

  private static ensureCanPush() {
    execBashCodeSafely('git push --delete origin gh-pages', false);
  }

  private static pushGhPagesSubtree() {
    execBashCode(`git subtree push --prefix ${DESTINATION_DIR} origin gh-pages`, false);
  }

  private clean() {
    execBashCode('git reset --soft HEAD^', false);
    execBashCode(`git restore --staged ${this.destinationDir}`, false);

    fs.removeSync(this.destinationDir);
  }
}

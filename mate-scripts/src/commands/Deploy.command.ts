import fs from 'fs-extra';
import path from 'path';
import { BackstopService } from '../services';
import { DESTINATION_DIR } from '../constants.js';
import { execBashCode } from '../tools';
import { BuildCommand } from './Build.command';
import { Command } from './Command';

export interface DeployOptions {
  shouldShowInternalLogs: boolean;
}

export class DeployCommand extends Command {
  private readonly buildCommand = this.child<BuildCommand>(BuildCommand);

  private readonly destinationDir = path.join(this.rootDir, DESTINATION_DIR);

  private readonly packageDir = path.join(
    this.rootDir,
    'node_modules',
    '@mate-academy',
    'scripts',
  );

  private deployScriptFile = path.join(
    this.packageDir,
    'bash-scripts',
    'deploy-layout.sh',
  );

  private readonly backstop = new BackstopService(this.rootDir);

  protected common(options: DeployOptions) {
  }

  protected layout = async (options: DeployOptions): Promise<void> => {
    const { shouldShowInternalLogs } = options;

    await this.buildCommand.run();

    console.log('Start deploy to gh-pages. Please wait, it may take up to minute.\n');

    try {
      this.copyHtmlReport();
      this.commitBuild(shouldShowInternalLogs);
      this.runDeployBashScript(shouldShowInternalLogs);

      console.log('\x1b[32mSuccessfully deployed to gh-pages!\n\x1b[0m');
    } catch (error) {
      console.error('\x1b[31mDeploy error: ', error.message, '\x1b[0m');
    }
  };

  private copyHtmlReport() {
    try {
      fs.copySync(
        path.join(this.backstop.reportDir),
        path.join(this.destinationDir, './report'),
      );
    } catch (e) {
      console.error('\x1b[33mWarning: No html_report\x1b[0m');
    }
  }

  private commitBuild(showLogs: boolean) {
    execBashCode(`git add ${this.destinationDir} -f`, showLogs);
    execBashCode('git commit -m "make build" --no-verify', showLogs);
  }

  private runDeployBashScript(showLogs: boolean) {
    execBashCode(
      `sh ${this.deployScriptFile} ${DESTINATION_DIR}`,
      showLogs,
      this.rootDir
    );
  }
}

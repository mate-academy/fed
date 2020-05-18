import fs from 'fs-extra';
import path from 'path';
import { BackstopService } from '../services';
import { execBashCode } from '../tools';
import { Command } from './Command';

export class InitCommand extends Command {
  private static readonly lintHtmlConfigDir = 'node_modules/@mate-academy/linthtml-config';

  private static readonly lintHtmlConfigFileName = '.linthtmlrc.json';

  private static readonly configsDir = path.join(__dirname, '../configs');

  private static readonly gitHooksSourceDir = path.join(InitCommand.configsDir, 'git-hooks');

  private readonly gitHooksDestinationDir = path.join(this.rootDir, './.git/hooks');

  private readonly backstop = new BackstopService(this.rootDir);

  protected common() {
    this.copyCommonConfigs();
    this.copyGitIgnore();
    this.initGitHooks();
  }

  protected layout = () => {
    this.copyLayoutConfigs();
    this.copyLinthtmlConfig();

    this.backstop.loadReferences();
  };

  private copyCommonConfigs() {
    const commonConfigsDir = path.join(InitCommand.configsDir, 'common');

    fs.copySync(commonConfigsDir, this.rootDir);
  }

  private copyGitIgnore() {
    const gitIgnoreFileName = '.gitignore';

    fs.copySync(
      path.join(InitCommand.configsDir, `${gitIgnoreFileName}.template`),
      path.join(this.rootDir, gitIgnoreFileName),
    );
  }

  private copyLayoutConfigs() {
    const layoutConfigsDir = path.join(InitCommand.configsDir, 'layout');

    fs.copySync(layoutConfigsDir, this.rootDir);
  }

  private copyLinthtmlConfig() {
    const lintHtmlConfigSource = path.join(
      this.rootDir,
      InitCommand.lintHtmlConfigDir,
      InitCommand.lintHtmlConfigFileName,
    );

    const lintHtmlConfigDestination = path.join(
      this.rootDir,
      InitCommand.lintHtmlConfigFileName,
    );

    fs.copyFileSync(lintHtmlConfigSource, lintHtmlConfigDestination);
  }

  private initGitHooks() {
    const gitHooksList = fs.readdirSync(InitCommand.gitHooksSourceDir);

    gitHooksList.forEach((hookName) => this.initGitHook(hookName));
  }

  private initGitHook(hookName: string) {
    const sourceHookFile = path.join(InitCommand.gitHooksSourceDir, hookName);
    const destinationHookFile = path.join(this.gitHooksDestinationDir, hookName);

    fs.copySync(sourceHookFile, destinationHookFile);

    InitCommand.makeGitHookExecutable(destinationHookFile);
  }

  private static makeGitHookExecutable(hookFile: string) {
    execBashCode(`chmod +x ${hookFile}`);
  }
}

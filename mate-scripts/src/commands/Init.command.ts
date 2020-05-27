import fs from 'fs-extra';
import path from 'path';
import { ProjectTypes } from '../constants.js';
import { Command } from './Command';

export class InitCommand extends Command {
  private static readonly lintHtmlConfigDir = 'node_modules/@mate-academy/linthtml-config';

  private static readonly lintHtmlConfigFileName = '.linthtmlrc.json';

  private static readonly configsDir = path.join(__dirname, '../configs');

  private static readonly gitHooksSourceDir = path.join(InitCommand.configsDir, 'git-hooks');

  private readonly gitHooksDestinationDir = path.join(this.rootDir, './.git/hooks');

  protected common() {
    this.copyCommonConfigs();
  }

  protected layout = () => {
    this.copyGitIgnore(ProjectTypes.Layout);
    this.copyProjectTypeSpecificConfigs(ProjectTypes.Layout);
    this.copyLinthtmlConfig();
    this.initGitHooks(ProjectTypes.Layout);
  };

  protected javascript = () => {
    this.copyGitIgnore(ProjectTypes.Javascript);
    this.copyProjectTypeSpecificConfigs(ProjectTypes.Javascript);
    this.initGitHooks(ProjectTypes.Javascript);
  };

  private copyCommonConfigs() {
    const commonConfigsDir = path.join(InitCommand.configsDir, 'common');

    fs.copySync(commonConfigsDir, this.rootDir);
  }

  private copyGitIgnore(projectType: ProjectTypes) {
    const gitIgnoreFileName = '.gitignore';

    fs.copySync(
      path.join(
        InitCommand.configsDir,
        'gitignoreTemplates',
        `${gitIgnoreFileName}.${projectType}`,
      ),
      path.join(this.rootDir, gitIgnoreFileName),
    );
  }

  private copyProjectTypeSpecificConfigs(projectType: ProjectTypes) {
    const configsDir = path.join(InitCommand.configsDir, projectType);

    fs.copySync(configsDir, this.rootDir);
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

  private initGitHooks(projectType: ProjectTypes) {
    const hooksDir = path.join(InitCommand.gitHooksSourceDir, projectType);
    const gitHooksList = fs.readdirSync(hooksDir);

    gitHooksList.forEach((hookName) => this.initGitHook(hooksDir, hookName));
  }

  private initGitHook(hooksDir: string, hookName: string) {
    const sourceHookFile = path.join(hooksDir, hookName);
    const destinationHookFile = path.join(this.gitHooksDestinationDir, hookName);

    fs.copySync(sourceHookFile, destinationHookFile);
  }
}

import path from 'path';
import fs from 'fs-extra';
import { NPMPackageService } from '../services';
import { ProjectTypes } from '../typedefs';
import { Command } from './Command';
import { readDirRecursive } from '../tools';

export class InitCommand extends Command {
  private static readonly configsDir = path.join(__dirname, '../configs');

  private static readonly gitHooksSourceDir = path.join(InitCommand.configsDir, 'git-hooks');

  private static readonly templatesDir = path.join(InitCommand.configsDir, 'templates');

  private readonly gitHooksDestinationDir = path.join(this.rootDir, './.git/hooks');

  private readonly crossEnvPackageService: NPMPackageService;

  constructor(rootDir: string) {
    super(rootDir);

    this.crossEnvPackageService = new NPMPackageService('cross-env');
  }

  protected common() {
    this.copyCommonConfigs();
  }

  protected layout = async () => {
    this.copyGitIgnore(ProjectTypes.Layout);
    this.copyProjectTypeSpecificConfigs(ProjectTypes.Layout);
    this.initGitHooks(ProjectTypes.Layout);

    await this.ensureCrossEnvInstalled();
  };

  protected layoutDOM = async () => {
    this.copyGitIgnore(ProjectTypes.LayoutDOM);
    this.copyProjectTypeSpecificConfigs(ProjectTypes.LayoutDOM);
    this.initGitHooks(ProjectTypes.LayoutDOM);

    await this.ensureCrossEnvInstalled();
  };

  protected javascript = () => {
    this.copyGitIgnore(ProjectTypes.Javascript);
    this.copyProjectTypeSpecificConfigs(ProjectTypes.Javascript);
    this.initGitHooks(ProjectTypes.Javascript);
  };

  protected nodeJs = () => {
    this.copyGitIgnore(ProjectTypes.NodeJs);
    this.copyProjectTypeSpecificConfigs(ProjectTypes.NodeJs);
    this.initGitHooks(ProjectTypes.NodeJs);
  }

  protected react = () => {
    this.copyGitIgnore(ProjectTypes.React);
    // this.copyProjectTypeSpecificConfigs(ProjectTypes.React);
    this.copyProjectTypeSpecificTemplates(ProjectTypes.React);
    this.initGitHooks(ProjectTypes.React);
  };

  protected reactTypescript = () => {
    this.copyGitIgnore(ProjectTypes.ReactTypescript);
    // this.copyProjectTypeSpecificConfigs(ProjectTypes.ReactTypescript);
    this.copyProjectTypeSpecificTemplates(ProjectTypes.ReactTypescript);
    this.initGitHooks(ProjectTypes.ReactTypescript);
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

    console.log('.gitignore copied');
  }

  private copyProjectTypeSpecificConfigs(projectType: ProjectTypes) {
    const configsDir = path.join(InitCommand.configsDir, projectType);

    fs.copySync(configsDir, this.rootDir);

    console.log(`${projectType} specific configs copied`);
  }

  private copyProjectTypeSpecificTemplates(projectType: ProjectTypes) {
    const configsDir = path.join(InitCommand.templatesDir, projectType);

    const filenames = readDirRecursive(configsDir)
      .filter((name) => (
        name.endsWith('.template')
      ));

    filenames.forEach((name) => {
      const destName = name.replace(/\.template$/, '');
      const sourcePath = path.join(configsDir, name);
      const destPath = path.join(this.rootDir, destName);

      fs.mkdirpSync(path.dirname(destPath));
      fs.copyFileSync(sourcePath, destPath);
    });

    console.log(`${projectType} specific templates copied`);
  }

  private initGitHooks(projectType: ProjectTypes) {
    const hooksDir = path.join(InitCommand.gitHooksSourceDir, projectType);
    const gitHooksList = fs.readdirSync(hooksDir);

    gitHooksList.forEach((hookName) => this.initGitHook(hooksDir, hookName));

    console.log('Git hooks installed');
  }

  private initGitHook(hooksDir: string, hookName: string) {
    const sourceHookFile = path.join(hooksDir, hookName);
    const destinationHookFile = path.join(
      this.gitHooksDestinationDir,
      hookName,
    );

    fs.copySync(sourceHookFile, destinationHookFile);

    console.log(`Git ${hookName} hook installed`);
  }

  private async ensureCrossEnvInstalled() {
    await this.crossEnvPackageService.ensure({ silent: false });

    console.log('Cross-env installed');
  }
}

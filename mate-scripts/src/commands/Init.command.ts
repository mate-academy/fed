import fs from 'fs-extra';
import path from 'path';
import { execBashCode } from '../tools/execBashCode.js';
import { Command } from './Command';

export class InitCommand extends Command {
  private static packagesPaths = {
    linthtml: 'node_modules/@mate-academy/linthtml-config',
  };

  private static configFileNames = {
    linthtml: '.linthtmlrc.json',
  };

  async run() {
    this.copyConfigs();

    await this.initBackstop();
    this.initGitHooks();
  }

  private copyConfigs() {
    this.copyCommonConfigs();
    this.copyLayoutConfigs();
    this.copyLinthtmlConfig();
  }

  private copyCommonConfigs() {
    const configsDir = path.join(__dirname, '../configs');
    const commonConfigsDir = path.join(configsDir, 'common');

    fs.copySync(commonConfigsDir, this.rootDir);
  }

  private copyLayoutConfigs() {
    const configsDir = path.join(__dirname, '../configs');
    const layoutConfigsDir = path.join(configsDir, 'layout');

    fs.copySync(layoutConfigsDir, this.rootDir);
  }

  private copyLinthtmlConfig() {
    fs.copyFileSync(
      path.join(this.rootDir, InitCommand.packagesPaths.linthtml, InitCommand.configFileNames.linthtml),
      path.join(this.rootDir, InitCommand.configFileNames.linthtml),
    );
  }

  private async initBackstop() {
    const backstopFolder = path.join(this.rootDir, 'backstop_data');
    const referencesDir = path.join(backstopFolder, 'bitmaps_reference');

    fs.removeSync(referencesDir);

    execBashCode(`backstop reference --config=${path.join(this.rootDir, './backstopConfig.js')}`);
  }

  private initGitHooks() {
    const configsDir = path.join(__dirname, '../configs');
    const gitHooksDir = path.join(configsDir, 'git-hooks');
    const targetHooksPath = path.join(this.rootDir, './.git/hooks');
    const gitHooksList = fs.readdirSync(gitHooksDir);

    gitHooksList.forEach((hookName) => {
      const targetHookFilename = path.join(targetHooksPath, hookName);

      fs.copySync(
        path.join(gitHooksDir, hookName),
        targetHookFilename,
      );

      execBashCode(`chmod +x ${targetHookFilename}`);
    });
  }
}

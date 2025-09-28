import { name } from '../../package.json';
import { NPMPackageService } from '../services';
import { emptyFn, execBashCodeSync } from '../tools';
import { Command } from './Command';

export class UpdateCommand extends Command {
  private mateScriptsPackageService: NPMPackageService;

  constructor(rootDir: string) {
    super(rootDir);

    this.mateScriptsPackageService = new NPMPackageService(name);
  }

  async common() {
    await this.updateMateScriptsVersions();

    console.log('versions updated successfully');

    execBashCodeSync(`${this.binDir}mate-scripts init`);

    console.log('init command success');
  }

  private async updateMateScriptsVersions() {
    await this.mateScriptsPackageService.update({
      envs: { local: true },
    });
  }

  protected layout = emptyFn;

  protected layoutVite = emptyFn;

  protected layoutDOM = emptyFn;

  protected javascript = emptyFn;

  protected nodeJs = emptyFn;

  protected react = emptyFn;

  protected reactTypescript = emptyFn;

  protected typescript = emptyFn;

  protected vue = emptyFn;

  protected vueTypescript = emptyFn;
}

import { name } from '../../package.json';
import { NPMPackageService } from '../services';
import { execBashCode } from '../tools';
import { Command } from './Command';

export class UpdateCommand extends Command {
  private mateScriptsPackageService: NPMPackageService;

  constructor(rootDir: string) {
    super(rootDir);

    this.mateScriptsPackageService = new NPMPackageService(name);
  }
  async common() {
    await this.updateMateScriptsVersions();

    execBashCode('npx mate-scripts init');
  }

  private async updateMateScriptsVersions() {
    await this.mateScriptsPackageService.update({
      envs: { global: true, local: true },
    });
  }

  protected layout = () => {};

  protected layoutDOM = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

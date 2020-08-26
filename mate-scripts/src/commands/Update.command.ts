import { name } from '../../package.json';
import { NpmService } from '../services';
import { execBashCode } from '../tools';
import { Command } from './Command';

export class UpdateCommand extends Command {
  private npmService: NpmService;

  constructor(rootDir: string) {
    super(rootDir);

    this.npmService = new NpmService(name);
  }
  async common() {
    await this.updateMateScriptsVersions();

    execBashCode('npx mate-scripts init');
  }

  private async updateMateScriptsVersions() {
    const versions = await this.npmService.getVersions();
    const {
      versionString: availableVersionString,
    } = versions.available;

    if (versions.available.isHigher(versions.global)) {
      console.log(`Update global @mate-academy/scripts from ${versions.global?.versionString || '"none"'} to ${versions.available.versionString}`);
      execBashCode(`npm i -g ${name}@${availableVersionString}`, false);
    }

    if (versions.available.isHigher(versions.local)) {
      console.log(`Update local @mate-academy/scripts from ${versions.local?.versionString || '"none"'} to ${versions.available.versionString}`);
      execBashCode(`npm i ${name}@${availableVersionString}`, false);
    }
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

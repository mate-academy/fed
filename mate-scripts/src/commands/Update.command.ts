import { name } from '../../package.json';
import { execBashCode, execBashCodeAsync } from '../tools';
import { Command } from './Command';

export class UpdateCommand extends Command {
  async common() {
    const version = await execBashCodeAsync(`npm view ${name} version`);

    execBashCode(`npm i ${name}@${version}`);
    execBashCode('npx mate-scripts init');
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

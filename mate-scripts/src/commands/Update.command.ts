import { execBashCode } from '../tools/execBashCode';
import { Command } from './Command';
import { name } from '../../package.json';

export class UpdateCommand extends Command {
  common() {
    execBashCode(`npm install -D ${name}@latest`);
    execBashCode('npm run init');
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

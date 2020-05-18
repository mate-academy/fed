import { execBashCode } from '../tools';
import { Command } from './Command';
import { name } from '../../package.json';

export class UpdateCommand extends Command {
  common() {
    execBashCode(`npm i ${name}$(npm view ${name} version)`);
    execBashCode('npm run init');
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

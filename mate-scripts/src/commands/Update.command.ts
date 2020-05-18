import { name } from '../../package.json';
import { execBashCode } from '../tools';
import { Command } from './Command';

export class UpdateCommand extends Command {
  common() {
    execBashCode(`npm i ${name}@$(npm view ${name} version)`);
    execBashCode('npx mate-scripts init');
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

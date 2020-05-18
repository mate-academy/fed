import { name } from '../../package.json';
import { execBashCode } from '../tools';
import { Command } from './Command';

export class UpdateCommand extends Command {
  common() {
    const version = execBashCode(`npm view ${name} version`);

    execBashCode(`npm i ${name}@${version}`);

    execBashCode('npx mate-scripts migrate');
    execBashCode('npx mate-scripts init');
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

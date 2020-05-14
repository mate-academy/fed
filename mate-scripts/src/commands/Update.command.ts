import { execBashCode } from '../tools/execBashCode';
import { Command } from './Command';
import { name } from '../../package.json';

export class UpdateCommand extends Command {
  async run(options?: any): Promise<void> {
    execBashCode(`npm install -D ${name}@latest`);
    execBashCode('npm run init');
  }
}

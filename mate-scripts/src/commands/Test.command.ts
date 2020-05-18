import { Backstop } from '../Backstop.js';
import { Command } from './Command';

export class TestCommand extends Command {
  private readonly backstop = new Backstop(this.rootDir);

  protected common(): void {
  }

  protected layout = ()=> {
    this.backstop.test();
  };
}

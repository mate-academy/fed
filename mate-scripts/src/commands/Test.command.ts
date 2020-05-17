import { Backstop } from '../Backstop.js';
import { Command } from './Command';

export class TestCommand extends Command {
  private readonly backstop = new Backstop(this.rootDir);

  async run(): Promise<void> {
    this.backstop.test();
  }
}

import { BackstopService } from '../services';
import { Command } from './Command';

export class TestCommand extends Command {
  private readonly backstop = new BackstopService(this.rootDir);

  protected common(): void {
  }

  protected layout = ()=> {
    this.backstop.test();
  };
}

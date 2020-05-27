import { BackstopService, JestService } from '../services';
import { Command } from './Command';

export class TestCommand extends Command {
  private readonly backstop = new BackstopService(this.rootDir);
  private readonly jest = new JestService();

  protected common(): void {
  }

  protected layout = () => {
    this.backstop.test();
  };

  protected javascript = () => {
    this.jest.once();
  };
}

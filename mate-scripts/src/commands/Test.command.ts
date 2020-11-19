import { BackstopService, JestService } from '../services';
import { Command } from './Command';
import { CypressService } from '../services/Cypress.service';

export interface TestOptions {
  open: boolean;
  showLogs: boolean;
}

export class TestCommand extends Command {
  private readonly backstop = new BackstopService(this.rootDir);
  private readonly jest = new JestService();
  private readonly cypress = new CypressService(this.rootDir);

  protected common(): void {
  }

  protected layout = () => {
    this.backstop.test();
  };

  protected layoutDOM = (options: TestOptions) => {
    this.cypress.run(options);
  };

  protected javascript = () => {
    this.jest.once();
  };

  protected typescript = () => {
    this.jest.once();
  };
}

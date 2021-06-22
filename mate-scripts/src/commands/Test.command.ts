import getPort from 'get-port';
import { BackstopService, JestService } from '../services';
import { Command } from './Command';
import { CypressService } from '../services/Cypress.service';
import { StartCommand } from './Start.command';
import { ProjectTypes } from '../typedefs';

export interface TestOptions {
  open: boolean;
  showLogs: boolean;
}

export class TestCommand extends Command {
  private readonly backstop = new BackstopService(this.rootDir);
  private readonly jest = new JestService();
  private readonly cypress = new CypressService(this.rootDir);
  private readonly startCommand = this.child(StartCommand);

  protected common(): void {
  }

  protected layout = async ({ showLogs }: TestOptions) => {
    const freePort = await getPort({ port: getPort.makeRange(3001, 3999) });

    const childProcess = this.startCommand.layout(
      { shouldShowInternalLogs: showLogs, open: false, port: freePort },
      true,
    );

    if (!childProcess.stdout) {
      childProcess.kill('SIGTERM');

      throw new Error('Unexpected error: child stdout is null');
    }

    let testsStarted = false;

    childProcess.stdout.on('data', (data) => {
      if (testsStarted || !data.toString().includes('Server running')) {
        return;
      }

      testsStarted = true;

      try {
        this.backstop.test(freePort);
        childProcess.kill('SIGTERM');
      } catch {
        childProcess.kill('SIGTERM');
        process.exit(1);
      }
    });
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

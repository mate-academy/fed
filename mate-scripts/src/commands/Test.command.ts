import getPort from 'get-port';
import { kill } from '../tools';
import { BackstopService, JestService } from '../services';
import { Command } from './Command';
import { CypressService, StartServer } from '../services/Cypress.service';
import { StartCommand } from './Start.command';

export interface TestOptions {
  open: boolean;
  showLogs: boolean;
}

export class TestCommand extends Command {
  private readonly backstop = new BackstopService(this.rootDir);

  private readonly jest = new JestService();

  private readonly cypress = new CypressService(this.rootDir);

  private readonly startCommand = this.child(StartCommand);

  private showLogs?: boolean;

  protected common(): void {
    // do nothing
  }

  protected layout = async ({ showLogs }: TestOptions) => {
    const freePort = await TestCommand.getPort();

    const childProcess = this.startCommand.layout(
      { shouldShowInternalLogs: showLogs, open: false, port: freePort },
      true,
    );

    if (!childProcess.stdout) {
      await kill(childProcess.pid);

      throw new Error('Unexpected error: child stdout is null');
    }

    let testsStarted = false;

    childProcess.stdout.on('data', async (data) => {
      if (testsStarted || !data.toString().includes('Server running')) {
        return;
      }

      testsStarted = true;

      try {
        this.backstop.test(freePort);
        this.jest.once();

        await kill(childProcess.pid);

        process.exit(0);
      } catch {
        await kill(childProcess.pid);

        process.exit(1);
      }
    });
  };

  protected layoutDOM = async (options: TestOptions) => {
    await this.cypress.run(options);
  };

  protected react = async (options: TestOptions) => {
    this.showLogs = options.showLogs;

    const {
      cypress,
      cypressComponents,
    } = this.config.tests;

    const startServer: StartServer = async () => {
      const freePort = await TestCommand.getPort();

      const childProcess = this.startCommand.react(
        {
          shouldShowInternalLogs: options.showLogs,
          open: false,
          port: freePort,
        },
        true,
      );

      let testsStarted = false;

      const serverStartedPromise = new Promise<void>(
        (resolve, reject) => {
          if (!childProcess.stdout) {
            kill(childProcess.pid)
              .then(() => {
                this.log('CHILD PROCESS KILLED: No stdout');
              })
              .catch((error) => {
                this.log('CHILD PROCESS NOT KILLED: No stdout');

                throw error;
              })
              .finally(() => {
                reject(new Error('Unexpected error: child stdout is null'));
              });

            return;
          }

          const stdoutListener = (data: any) => {
            if (
              testsStarted
            || !(
              data.toString().includes(`http://localhost:${freePort}`)
              || data.toString().includes('Compiled with warnings')
            )
            ) {
              return;
            }

            testsStarted = true;

            childProcess.stdout?.off('data', stdoutListener);

            resolve();
          };

          childProcess.stdout.on('data', stdoutListener);
        },
      );

      const timeoutPromise = new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          if (!testsStarted) {
            try {
              await kill(childProcess.pid);

              this.log('CHILD PROCESS KILLED: Timeout');
            } catch (error) {
              this.log('CHILD PROCESS NOT KILLED: Timeout');
            }

            reject(new Error('Server not started after 30 seconds'));
          } else {
            resolve();
          }
        }, 30000);
      });

      await Promise.race([
        serverStartedPromise,
        timeoutPromise,
      ]);

      return {
        port: freePort,
        stop: async () => {
          try {
            await kill(childProcess.pid);

            this.log('CHILD PROCESS KILLED: Stop');
          } catch (error) {
            this.log('CHILD PROCESS NOT KILLED: Stop');
          }
        },
      };
    };

    if (cypress || cypressComponents) {
      await this.cypress.run({
        ...options,
        e2e: cypress,
        components: cypressComponents,
        startServer,
      });
    }
  };

  protected reactTypescript = async (options: TestOptions) => {
    await this.react(options);
  };

  protected javascript = () => {
    this.jest.once();
  };

  protected typescript = () => {
    this.jest.once();
  };

  private static getPort(): Promise<number> {
    return getPort({ port: getPort.makeRange(3001, 3999) });
  }

  private log(...args: any) {
    if (this.showLogs) {
      console.log(...args);
    }
  }
}

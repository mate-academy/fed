import { ChildProcess } from 'child_process';
import getPort from 'get-port';
import { kill } from '../tools';
import { BackstopService, JestService } from '../services';
import { Command } from './Command';
import { CypressService, StartServer } from '../services/Cypress.service';
import { StartCommand } from './Start.command';
import { ReportService } from '../services/Report.service';
import { Spinner } from '../tools/Spinner';

export interface TestOptions {
  open: boolean;
  showLogs: boolean;
}

export class TestCommand extends Command {
  private readonly backstop = new BackstopService(this.rootDir);

  private readonly jest = new JestService();

  private readonly cypress = new CypressService(this.rootDir);

  private readonly report = new ReportService(this.rootDir);

  private readonly startCommand = this.child(StartCommand);

  private readonly spinner = new Spinner();

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
    const { showLogs } = options;

    this.showLogs = showLogs;

    const { jest } = this.config.tests;

    const startServer: StartServer = async () => {
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
            if (testsStarted || !data.toString().includes('Server running')) {
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

    await this.executeWithReportAndSpinner(async () => {
      let testsFailed = false;

      if (jest) {
        const { exitCode } = await this.jest.onceAsync();

        testsFailed = exitCode !== 0;
      }

      const failedCasesCount = await this.cypress.run({
        ...options,
        e2e: true,
        startServer,
      });

      testsFailed = testsFailed || failedCasesCount > 0;

      return testsFailed
        ? 1
        : 0;
    });
  };

  // eslint-disable-next-line arrow-body-style
  private startReact = (port: number, shouldShowInternalLogs = false) => {
    return this.startCommand.react(
      { shouldShowInternalLogs, open: false, port },
      true,
    );
  };

  // eslint-disable-next-line arrow-body-style
  private startVue = (port: number, shouldShowInternalLogs = false) => {
    return this.startCommand.vue(
      { shouldShowInternalLogs, open: false, port },
      true,
    );
  };

  private test = async (
    options: TestOptions,
    start: (port: number, shouldShowInternalLogs?: boolean) => ChildProcess,
  ) => {
    this.showLogs = options.showLogs;

    const {
      cypress,
      cypressComponents,
    } = this.config.tests;

    const startServer: StartServer = async () => {
      const freePort = await TestCommand.getPort();
      const childProcess = start(freePort, options.showLogs);
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
              testsStarted || !(
                data.toString().includes(`http://localhost`)
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

    await this.executeWithReportAndSpinner(async () => {
      let testsFailed = false;

      if (cypress || cypressComponents) {
        const failedCasesCount = await this.cypress.run({
          ...options,
          e2e: cypress,
          components: cypressComponents,
          startServer,
        });

        testsFailed = failedCasesCount > 0;
      }

      return testsFailed
        ? 1
        : 0;
    });
  }

  protected react = async (options: TestOptions) => {
    await this.test(options, this.startReact);
  };

  protected reactTypescript = async (options: TestOptions) => {
    await this.react(options);
  };

  protected vue = async (options: TestOptions) => {
    await this.test(options, this.startVue);
  };

  protected vueTypescript = async (options: TestOptions) => {
    await this.vue(options);
  };

  protected javascript = () => {
    this.jest.once();
  };

  protected nodeJs = () => {
    this.jest.once();
  }

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

  async executeWithReportAndSpinner(
    callback: () => Promise<number>,
  ) {
    let exitCode = 0;

    try {
      await this.report.runBeforeTests();

      if (!this.showLogs) {
        this.spinner.start();
      }

      exitCode = await callback();
    } catch (error) {
      this.log('TESTS EXECUTION FAILED', error);

      process.exit(1);
    } finally {
      this.spinner.stop();

      await this.report.runAfterTests();
    }

    if (exitCode > 0) {
      process.exit(1);
    }
  }
}

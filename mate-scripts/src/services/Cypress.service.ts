import path from 'path';
import { execBashCodeAsyncWithOutput } from '../tools';

export interface StartedServer {
  stop: () => void;
  port: number;
}

export type StartServer = () => Promise<StartedServer>;

export interface RunOptions {
  showLogs?: boolean;
  open?: boolean;
  e2e?: boolean;
  components?: boolean;
  startServer?: StartServer;
}

export class CypressService {
  private shouldShowLogs = false;

  private shouldRunE2E = true;

  private shouldRunComponents = false;

  private startServer?: StartServer;

  private readonly binDir = path.join(this.rootDir, 'node_modules/.bin/');

  constructor(private readonly rootDir: string) {
  }

  async run(options?: RunOptions): Promise<number> {
    this.processOptions(options);

    this.log('CYPRESS RUN CALLED', options);

    let executionFailed = false;
    let failedCasesCount = 0;

    try {
      this.log('RUN CYPRESS');

      failedCasesCount = await this.runCypress();

      this.log('CYPRESS TESTS RUN SUCCESS');
    } catch (errors) {
      this.log('CYPRESS TESTS RUN FAIL', errors);

      executionFailed = true;
    } finally {
      if (executionFailed) {
        process.exit(1);
      }
    }

    return failedCasesCount;
  }

  private processOptions(options: RunOptions = {}) {
    const {
      showLogs = false,
      e2e = true,
      components = false,
      startServer,
    } = options;

    this.shouldShowLogs = showLogs;
    this.shouldRunE2E = e2e;
    this.shouldRunComponents = components;
    this.startServer = startServer;
  }

  private async runCypress(): Promise<number> {
    const errors = [];
    let failedCasesCount = 0;

    if (this.shouldRunE2E) {
      let startedServer: StartedServer | undefined;

      if (this.startServer) {
        startedServer = await this.startServer();
      }

      try {
        const baseUrl = startedServer
          ? ` --config baseUrl=http://localhost:${startedServer.port}`
          : '';

        const { stdout, stderr, exitCode } = await execBashCodeAsyncWithOutput(
          `${this.binDir}cypress run${baseUrl}`,
          { shouldBindStdout: true },
        );

        // Cypress can return non-zero exit code
        // because some tests are failed
        if (exitCode !== 0) {
          if (!stdout.includes('(Run Finished)')) {
            throw new Error(stderr);
          }

          failedCasesCount += exitCode;
        }
      } catch (e2eError) {
        errors.push(e2eError);
      } finally {
        if (startedServer) {
          startedServer.stop();
        }
      }
    }

    if (this.shouldRunComponents) {
      try {
        const { stdout, stderr, exitCode } = await execBashCodeAsyncWithOutput(
          `${this.binDir}cypress run-ct`,
          { shouldBindStdout: true },
        );

        // Cypress can return non-zero exit code
        // because some tests are failed
        if (exitCode !== 0) {
          if (!stdout.includes('(Run Finished)')) {
            throw new Error(stderr);
          }

          failedCasesCount += exitCode;
        }
      } catch (componentsError) {
        errors.push(componentsError);
      }
    }

    if (errors.length) {
      throw errors;
    }

    return failedCasesCount;
  }

  private log(message: string, data?: any) {
    if (!this.shouldShowLogs) {
      return;
    }

    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
}

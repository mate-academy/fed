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

  async run(options?: RunOptions) {
    this.processOptions(options);

    this.log('CYPRESS RUN CALLED', options);

    let failed = false;

    try {
      this.log('RUN CYPRESS');

      await this.runCypress();

      this.log('CYPRESS TESTS RUN SUCCESS');
    } catch (errors) {
      this.log('CYPRESS TESTS RUN FAIL', errors);

      failed = true;
    } finally {
      if (failed) {
        process.exit(1);
      }
    }
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

  private async runCypress() {
    const errors = [];

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
          { shouldBindStdout: this.shouldShowLogs },
        );

        // Cypress can return non-zero exit code
        // because some tests are failed
        if (exitCode !== 0) {
          if (!stdout.includes('(Run Finished)')) {
            throw new Error(stderr);
          }
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
          { shouldBindStdout: this.shouldShowLogs },
        );

        // Cypress can return non-zero exit code
        // because some tests are failed
        if (exitCode !== 0) {
          if (!stdout.includes('(Run Finished)')) {
            throw new Error(stderr);
          }
        }
      } catch (componentsError) {
        errors.push(componentsError);
      }
    }

    if (errors.length) {
      throw errors;
    }
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

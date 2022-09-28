import path from 'path';
import fs from 'fs-extra';
import open from 'open';
import { execBashCodeAsync } from '../tools';

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
  private shouldOpen: boolean = true;

  private shouldShowLogs: boolean = false;

  private shouldRunE2E: boolean = true;

  private shouldRunComponents: boolean = false;

  private startServer?: StartServer;

  private readonly reportsDir = path.join(this.rootDir, 'reports');

  private readonly rawReportsDir = path.join(this.rootDir, 'raw_reports');

  private readonly mergedReport = path.join(this.reportsDir, 'report.json');

  private readonly binDir = path.join(this.rootDir, 'node_modules/.bin/');

  constructor(private readonly rootDir: string) {
  }

  async run(options?: RunOptions) {
    this.processOptions(options);

    this.log('CYPRESS RUN CALLED', options);

    await this.cleanPrevReports();

    this.log('OLD REPORTS REMOVED');

    let failed = false;

    try {
      this.log('RUN CYPRESS');

      await this.runCypress();

      this.log('CYPRESS TESTS RUN SUCCESS');
    } catch (errors) {
      this.log('CYPRESS TESTS RUN FAIL', errors);

      failed = true;
    } finally {
      const hasBeenReportsCreated = await this.prepareReports();

      this.log('TEST REPORTS PREPARED', hasBeenReportsCreated);

      if (hasBeenReportsCreated && this.shouldOpen) {
        this.log('OPEN REPORTS IN BROWSER');

        await this.openReportInBrowser();
      } else {
        this.log('SKIP OPEN REPORTS IN BROWSER ACCORDING');
      }

      if (failed) {
        process.exit(1);
      }
    }
  }

  private processOptions(options: RunOptions = {}) {
    const {
      showLogs = false,
      open: shouldOpen = true,
      e2e = true,
      components = false,
      startServer,
    } = options;

    this.shouldOpen = shouldOpen;
    this.shouldShowLogs = showLogs;
    this.shouldRunE2E = e2e;
    this.shouldRunComponents = components;
    this.startServer = startServer;
  }

  private async cleanPrevReports() {
    await Promise.all([
      this.cleanReports(),
      this.cleanRawReports(),
    ]);
  }

  private async cleanReports() {
    await fs.remove(this.reportsDir);
  }

  private async cleanRawReports() {
    await fs.remove(this.rawReportsDir);
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

        await execBashCodeAsync(
          `${this.binDir}cypress run${baseUrl}`,
          { shouldBindStdout: this.shouldShowLogs },
        );
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
        await execBashCodeAsync(
          `${this.binDir}cypress run-ct`,
          { shouldBindStdout: this.shouldShowLogs },
        );
      } catch (componentsError) {
        errors.push(componentsError);
      }
    }

    if (errors.length) {
      throw errors;
    }
  }

  private async prepareReports(): Promise<boolean> {
    const hasRawReports = await this.hasRawReports();

    if (!hasRawReports) {
      this.log('REPORTS WAS NOT CREATED DURING TEST RUN. SKIP REPORTS PREPARING');

      await this.cleanRawReports();

      return false;
    }

    await this.makeReportsDir();
    await this.mergeReports();
    await this.generateHtmlReport();
    await this.cleanRawReports();

    return true;
  }

  private async hasRawReports() {
    const isFolderExists = await fs.pathExists(this.rawReportsDir);

    if (!isFolderExists) {
      return false;
    }

    const rawReportsNames = await fs.readdir(this.rawReportsDir);

    return rawReportsNames.length > 0;
  }

  private async makeReportsDir() {
    await fs.mkdir(this.reportsDir);
  }

  private async mergeReports() {
    const partsGlob = path.join(this.rawReportsDir, '*.json');

    await execBashCodeAsync(
      `${this.binDir}mochawesome-merge "${partsGlob}" > ${this.mergedReport}`,
      { shouldBindStdout: this.shouldShowLogs },
    );
  }

  private async generateHtmlReport() {
    await execBashCodeAsync(
      `${this.binDir}marge -o ${this.reportsDir} ${this.mergedReport}`,
      { shouldBindStdout: this.shouldShowLogs },
    );
  }

  private async openReportInBrowser() {
    await open(`file://${path.join(this.reportsDir, 'report.html')}`);
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

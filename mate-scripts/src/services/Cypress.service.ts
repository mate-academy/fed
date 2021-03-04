import fs from 'fs-extra';
import path from 'path';
import { execBashCodeAsync } from '../tools';
import open from 'open';

interface RunOptions {
  showLogs?: boolean;
  open?: boolean;
}

export class CypressService {
  private shouldOpen: boolean = true;

  private shouldShowLogs: boolean = false;

  private readonly reportsDir = path.join(this.rootDir, 'reports');

  private readonly rawReportsDir = path.join(this.rootDir, 'raw_reports');

  private readonly mergedReport = path.join(this.reportsDir, 'report.json');

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
    } catch (error) {
      this.log('CYPRESS TESTS RUN FAIL', error, true);

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
      open = true,
    } = options;

    this.shouldOpen = open;
    this.shouldShowLogs = showLogs;
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

  private runCypress() {
    return execBashCodeAsync(
      'npx cypress run',
      { shouldBindStdout: this.shouldShowLogs },
    );
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
      `npx mochawesome-merge "${partsGlob}" > ${this.mergedReport}`,
      { shouldBindStdout: this.shouldShowLogs }
    );
  }

  private async generateHtmlReport() {
    await execBashCodeAsync(
      `npx marge -o ${this.reportsDir} ${this.mergedReport}`,
      { shouldBindStdout: this.shouldShowLogs },
    );
  }

  private async openReportInBrowser() {
    await open(`file://${path.join(this.reportsDir, 'report.html')}`);
  }

  private log(message: string, data?: any, force = false) {
    if (!this.shouldShowLogs && !force) {
      return;
    }

    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
}

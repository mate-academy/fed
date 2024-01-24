import path from 'path';
import fs from 'fs-extra';
import open from 'open';
import { execBashCodeAsync } from '../tools';

export interface RunOptions {
  open?: boolean;
  showLogs?: boolean;
}

export class ReportService {
  private shouldOpen = true;

  private shouldShowLogs = false;

  private isReporterStarted = false;

  private readonly reportsDir = path.join(this.rootDir, 'reports');

  private readonly rawReportsDir = path.join(this.rootDir, 'raw_reports');

  private readonly mergedReport = path.join(this.reportsDir, 'report.json');

  private readonly binDir = path.join(this.rootDir, 'node_modules/.bin/');

  constructor(private readonly rootDir: string) {
  }

  async runBeforeTests(options?: RunOptions) {
    this.processOptions(options);

    await this.cleanPrevReports();
    await this.makeRawReportsDir();

    this.isReporterStarted = true;
  }

  async runAfterTests() {
    if (!this.isReporterStarted) {
      this.log('REPORTER WAS NOT STARTED. SKIP REPORTS PREPARING');
    }

    let haveReportsBeenCreated = false;

    try {
      haveReportsBeenCreated = await this.prepareReports();
    } catch (error) {
      this.log('REPORTS PREPARING FAIL', error);
    }

    if (haveReportsBeenCreated && this.shouldOpen) {
      this.log('OPEN REPORTS IN BROWSER');

      await this.openReportInBrowser();
    } else {
      this.log('SKIP OPEN REPORTS IN BROWSER ACCORDING');
    }

    this.isReporterStarted = false;
  }

  private processOptions(options: RunOptions = {}) {
    const {
      open: shouldOpen = true,
      showLogs = false,
    } = options;

    this.shouldOpen = shouldOpen;
    this.shouldShowLogs = showLogs;
  }

  private async cleanPrevReports() {
    await Promise.all([
      this.cleanReports(),
      this.cleanRawReports(),
    ]);

    this.log('OLD REPORTS REMOVED');
  }

  private async cleanReports() {
    await fs.remove(this.reportsDir);
  }

  private async cleanRawReports() {
    await fs.remove(this.rawReportsDir);
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

    this.log('TEST REPORTS PREPARED');

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

  private async makeRawReportsDir() {
    await fs.mkdir(this.rawReportsDir);
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

import fs from 'fs-extra';
import path from 'path';
import { execBashCodeSilent } from './tools/execBashCode.js';

export class Backstop {
  private static __instance: Backstop;

  private readonly configPath = path.join(this.rootDir, './backstopConfig.js');

  private readonly dataDir = path.join(this.rootDir, 'backstop_data');

  private readonly referencesDir = path.join(this.dataDir, 'bitmaps_reference');

  private readonly testResultsDir = path.join(this.dataDir, 'bitmaps_test');

  readonly htmlReportDir = path.join(this.dataDir, 'html_report');

  constructor(private readonly rootDir: string) {
    if (!Backstop.__instance) {
      Backstop.__instance = this;
    }

    return Backstop.__instance;
  }

  test() {
    this.ensureReferences();
    this.cleanTestResults();

    Backstop.run('test', { config: this.configPath });
  }

  private ensureReferences() {
    if (this.areReferencesExists()) {
      return;
    }

    this.loadReferences();
  }

  private areReferencesExists() {
    return fs.existsSync(this.referencesDir);
  }

  private cleanTestResults() {
    fs.removeSync(this.testResultsDir);
  }

  loadReferences() {
    this.cleanReference();

    Backstop.run('reference', { config: this.configPath });
  }

  private cleanReference() {
    fs.removeSync(this.referencesDir);
  }

  private static run(subCommand: string, options: Record<string, any>) {
    const optionsString = Object.entries(options)
      .reduce((acc, [key, value]) => (
        `${acc} --${key}=${value}`
      ), '');

    execBashCodeSilent(`backstop ${subCommand} ${optionsString}`)
  }
}

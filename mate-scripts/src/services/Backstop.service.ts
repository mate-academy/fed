import fs from 'fs-extra';
import path from 'path';
import { execBashCodeSilent, makeCLIOptions } from '../tools';

export class BackstopService {
  private static __instance: BackstopService;

  private readonly configPath = path.join(this.rootDir, './backstopConfig.js');

  private readonly dataDir = path.join(this.rootDir, 'backstop_data');

  private readonly referencesDir = path.join(this.dataDir, 'bitmaps_reference');

  private readonly testResultsDir = path.join(this.dataDir, 'bitmaps_test');

  readonly reportDir = this.dataDir;

  constructor(private readonly rootDir: string) {
    if (!BackstopService.__instance) {
      BackstopService.__instance = this;
    }

    return BackstopService.__instance;
  }

  test() {
    if (fs.existsSync(this.configPath)) {
      this.ensureReferences();
      this.cleanTestResults();

      BackstopService.run('test', { config: this.configPath });
    }
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
    if (fs.existsSync(this.configPath)) {
      this.cleanReference();

      BackstopService.run('reference', { config: this.configPath });
    }
  }

  private cleanReference() {
    fs.removeSync(this.referencesDir);
  }

  private static run(subCommand: string, options: Record<string, any>) {
    const optionsString = makeCLIOptions(options);

    execBashCodeSilent(`backstop ${subCommand} ${optionsString}`)
  }
}

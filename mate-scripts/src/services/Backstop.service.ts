import fs from 'fs-extra';
import path from 'path';
import { execBashCodeSilent, execBashCodeSync, makeCLIOptions } from '../tools';

export class BackstopService {
  private static __instance: BackstopService;

  private readonly configPath = path.join(this.rootDir, './backstopConfig.js');

  private readonly dataDir = path.join(this.rootDir, 'backstop_data');

  private readonly referencesDir = path.join(this.dataDir, 'bitmaps_reference');

  private readonly testResultsDir = path.join(this.dataDir, 'bitmaps_test');

  private readonly binDir = path.join(this.rootDir, 'node_modules/.bin/');

  readonly reportDir = this.dataDir;

  constructor(private readonly rootDir: string) {
    if (!BackstopService.__instance) {
      BackstopService.__instance = this;
    }

    return BackstopService.__instance;
  }

  test(port = 8080) {
    if (fs.existsSync(this.configPath)) {
      this.ensureReferences();
      this.cleanTestResults();

      this.run('test', { config: this.configPath, port });
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

      this.run('reference', { config: this.configPath });
    }
  }

  private cleanReference() {
    fs.removeSync(this.referencesDir);
  }

  private run(subCommand: string, { port, ...options }: Record<string, any>) {
    const optionsString = makeCLIOptions(options);

    execBashCodeSync(`cross-env PORT=${port} ${this.binDir}backstop ${subCommand} ${optionsString}`)
  }
}

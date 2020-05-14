import fs from 'fs-extra';
import path from 'path';
import { execBashCodeSilent } from '../tools/execBashCode.js';
import { Command } from './Command';

export class TestCommand extends Command {
  async run(): Promise<void> {
    fs.removeSync(
      path.join(this.rootDir, './backstop_data/bitmaps_test'),
    );

    execBashCodeSilent(
      'backstop test --config=backstopConfig.js',
    );
  }
}

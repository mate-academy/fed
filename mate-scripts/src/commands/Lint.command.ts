import path from 'path';
import { execBashCodeSilent } from '../tools/execBashCode';
import { Command } from './Command';

export interface LintOptions {
  html: boolean;
  styles: boolean;
  javascript: boolean;
  files?: string[];
}

export class LintCommand extends Command {
  srcDir = `${path.join(this.rootDir, './src')}`;

  async run(options: LintOptions): Promise<void> {
    const { html, styles, javascript, files } = options;
    const filesToLint = files
      ? files.join(' ')
      : this.srcDir;

    html && LintCommand.lintHtml(filesToLint);
    styles && LintCommand.lintStyles(filesToLint);
    javascript && LintCommand.lintJs(filesToLint);
  }

  private static lintHtml(filesToLint: string) {
    execBashCodeSilent(`linthtml ${filesToLint}`);
  }

  private static lintStyles(filesToLint: string) {
    execBashCodeSilent(`stylelint ${filesToLint}`);
  }

  private static lintJs(filesToLint: string) {
    execBashCodeSilent(`eslint ${filesToLint}`);
  }
}

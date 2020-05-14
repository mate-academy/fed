import path from 'path';
import { execBashCodeSilent } from '../tools/execBashCode.js';
import { Command } from './Command';

export interface LintOptions {
  html: boolean;
  styles: boolean;
  javascript: boolean;
}

export class LintCommand extends Command {
  async run(options: LintOptions): Promise<void> {
    const { html, styles, javascript } = options;

    html && this.lintHtml();
    styles && this.lintStyles();
    javascript && this.lintJs();
  }

  private lintHtml() {
    execBashCodeSilent(`linthtml ${path.join(this.rootDir, 'src/**/*.html')}`);
  }

  private lintStyles() {
    execBashCodeSilent(`stylelint ${path.join(this.rootDir, 'src/**/*.*css')}`);
  }

  private lintJs() {
    execBashCodeSilent(`eslint ${path.join(this.rootDir, 'src/**/*.js')}`);
  }
}

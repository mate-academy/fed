import { execBashCodeSilent } from '../tools';
import { Command } from './Command';

export interface LintOptions {
  html: boolean;
  styles: boolean;
  javascript: boolean;
  files: string[] | null;
}

export class LintCommand extends Command {
  protected common(options: LintOptions) {
  }

  protected layout = (options: LintOptions) => {
    const { html, files, styles, javascript } = options;

    styles && LintCommand.lintStyles(files);
    html && LintCommand.lintHtml(files);
    javascript && LintCommand.lintJs(files);
  };

  protected layoutDOM = (options: LintOptions) => {
    this.layout(options);
  };

  protected javascript = (options: LintOptions) => {
    const { javascript, files } = options;

    javascript && LintCommand.lintJs(files);
  };

  private static lintHtml(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src/**/*.html';

    execBashCodeSilent(`npx linthtml ${filesToLint}`);
  }

  private static lintStyles(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src/**/*.css ./src/**/*.scss';

    execBashCodeSilent(`npx stylelint ${filesToLint}`);
  }

  private static lintJs(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src';

    execBashCodeSilent(`npx eslint ${filesToLint}`);
  }
}

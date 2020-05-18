import { execBashCodeSilent } from '../tools/execBashCode';
import { Command } from './Command';

export interface LintOptions {
  html: boolean;
  styles: boolean;
  javascript: boolean;
  files: string[] | null;
}

export class LintCommand extends Command {
  protected common(options: LintOptions) {
    const { styles, javascript, files } = options;

    styles && LintCommand.lintStyles(files);
    javascript && LintCommand.lintJs(files);
  }

  protected layout = (options: LintOptions) => {
    const { html, files } = options;

    html && LintCommand.lintHtml(files);
  };

  private static lintHtml(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src/**/*.html';

    execBashCodeSilent(`linthtml ${filesToLint}`);
  }

  private static lintStyles(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src/**/*.css ./src/**/*.scss';

    execBashCodeSilent(`stylelint ${filesToLint}`);
  }

  private static lintJs(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src';

    execBashCodeSilent(`eslint ${filesToLint}`);
  }
}

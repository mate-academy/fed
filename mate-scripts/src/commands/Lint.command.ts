import { execBashCodeSilent } from '../tools';
import { Linters } from '../typedefs';
import { Command } from './Command';

export type LintOptions = Linters & {
  files: string[] | null;
}

export class LintCommand extends Command {
  constructor(rootDir: string) {
    super(rootDir);
  }

  protected common(options: LintOptions) {
  }

  protected layout = (options: LintOptions) => {
    const { html, bem, files, styles, javascript } = options;
    const { linters } = this.config;

    html && linters.html && LintCommand.lintHtml(files);
    bem && linters.bem && LintCommand.lintBem(files);
    styles && linters.styles && LintCommand.lintStyles(files);
    javascript && linters.javascript && LintCommand.lintJs(files);
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

  private static lintBem(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src';

    execBashCodeSilent(`npx bemlint ${filesToLint}`);
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

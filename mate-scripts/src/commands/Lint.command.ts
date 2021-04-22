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

    html && linters.html && this.lintHtml(files);
    bem && linters.bem && this.lintBem(files);
    styles && linters.styles && this.lintStyles(files);
    javascript && linters.javascript && this.lintJs(files);
  };

  protected layoutDOM = (options: LintOptions) => {
    this.layout(options);
  };

  protected javascript = (options: LintOptions) => {
    const { javascript, files } = options;

    javascript && this.lintJs(files);
  };

  private lintHtml(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src/**/*.html';


    execBashCodeSilent(`${this.binDir}linthtml ${filesToLint}`);
  }

  private lintBem(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src';

    execBashCodeSilent(`${this.binDir}bemlint ${filesToLint}`);
  }

  private lintStyles(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src/**/*.css ./src/**/*.scss';

    execBashCodeSilent(`${this.binDir}stylelint ${filesToLint}`);
  }

  private lintJs(files: LintOptions['files']) {
    const filesToLint = files
      ? files.join(' ')
      : './src';

    execBashCodeSilent(`${this.binDir}eslint ${filesToLint}`);
  }
}

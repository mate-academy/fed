import { execBashCodeSilent } from '../tools';
import { Linters } from '../typedefs';
import { Command } from './Command';

export type LintOptions = Linters & {
  files: string[] | null;
};

export class LintCommand extends Command {
  protected common(): void {
    // do nothing
  }

  protected layout = (options: LintOptions) => {
    const {
      html, bem, files, styles, javascript,
    } = options;
    const { linters } = this.config;

    if (html && linters.html) {
      this.lintHtml(files);
    }

    if (bem && linters.bem) {
      this.lintBem(files);
    }

    if (styles && linters.styles) {
      this.lintStyles(files);
    }

    if (javascript && linters.javascript) {
      this.lintJs(files);
    }
  };

  protected layoutDOM = (options: LintOptions) => {
    this.layout(options);
  };

  protected javascript = (options: LintOptions) => {
    const { javascript, files } = options;

    if (javascript) {
      this.lintJs(files);
    }
  };

  protected react = (options: LintOptions) => {
    const { javascript, styles, files } = options;

    if (styles) {
      this.lintStyles(files);
    }

    if (javascript) {
      this.lintJs(files);
    }
  };

  protected reactTypescript = (options: LintOptions) => {
    this.react(options);
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

    execBashCodeSilent(
      `${this.binDir}eslint --ext .ts,.tsx,.js,.jsx ${filesToLint} --fix`,
    );
  }
}

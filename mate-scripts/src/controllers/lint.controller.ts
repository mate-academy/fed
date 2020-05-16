import { LintOptions } from '../commands';
import { Controller } from './Controller';

export const lintController: Controller<LintOptions> = (command, files: string[]) => {
  const { styles, html, javascript } = command;

  if (!(styles || html || javascript)) {
    return {
      styles: true,
      html: true,
      javascript: true,
      files,
    };
  }

  return { styles, html, javascript, files };
};

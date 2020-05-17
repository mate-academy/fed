import { LintOptions } from '../commands';
import { Controller } from './Controller';

export const lintController: Controller<LintOptions> = (command, files: string[]) => {
  const { styles, html, javascript } = command;
  const ensuredFiles = !files || !files.length
    ? null
    : files;

  if (!(styles || html || javascript)) {
    return {
      styles: true,
      html: true,
      javascript: true,
      files: ensuredFiles,
    };
  }

  return { styles, html, javascript, files: ensuredFiles };
};

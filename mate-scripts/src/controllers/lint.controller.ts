import { LintOptions } from '../commands';
import { Controller } from './Controller';

export const lintController: Controller<LintOptions> = (command, files: string[]) => {
  const {
    styles,
    html,
    bem,
    javascript,
  } = command;

  const ensuredFiles = !files || !files.length
    ? null
    : files;

  if (!(styles || html || javascript || bem)) {
    return {
      styles: true,
      html: true,
      bem: true,
      javascript: true,
      files: ensuredFiles,
    };
  }

  return { styles, html, bem, javascript, files: ensuredFiles };
};

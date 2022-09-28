import { LintOptions } from '../commands';
import { Controller } from './Controller';

export const lintController: Controller<LintOptions> = (
  command,
  files: string[],
) => {
  const {
    styles,
    html,
    bem,
    javascript,
    htmlLint,
  } = command;

  const ensuredFiles = !files || !files.length
    ? null
    : files;

  if (!(styles || html || javascript || bem || htmlLint)) {
    return {
      styles: true,
      html: true,
      bem: true,
      javascript: true,
      htmlLint: true,
      files: ensuredFiles,
    };
  }

  return {
    styles, html, bem, javascript, files: ensuredFiles, htmlLint
  };
};

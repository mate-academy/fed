import { LintOptions } from '../commands';
import { Controller } from './Controller';

export const lintController: Controller<LintOptions> = (command) => {
  const { styles, html, javascript } = command;

  if (!(styles && html && javascript)) {
    return {
      styles: true,
      html: true,
      javascript: true,
    };
  }

  return { styles, html, javascript };
};

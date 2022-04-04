import { StartOptions } from '../commands';
import { Controller } from './Controller';

export const startController: Controller<StartOptions> = (command) => {
  const { logs, open } = command;

  return {
    shouldShowInternalLogs: logs,
    open,
  };
};

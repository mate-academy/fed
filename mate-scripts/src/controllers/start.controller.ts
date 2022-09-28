import { StartOptions } from '../commands';
import { Controller } from './Controller';

export const startController: Controller<StartOptions> = (command) => {
  const { logs, open, port } = command;

  return {
    shouldShowInternalLogs: logs,
    open,
    port,
  };
};

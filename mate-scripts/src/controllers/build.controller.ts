import { Controller } from './Controller';
import { BuildOptions } from '../commands';

export const buildController: Controller<BuildOptions> = (command) => {
  const { logs } = command;

  return {
    shouldShowInternalLogs: logs,
  };
};

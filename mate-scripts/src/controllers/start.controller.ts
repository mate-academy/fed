import { DeployOptions, StartOptions } from '../commands';
import { Controller } from './Controller';

export const startController: Controller<StartOptions> = (command) => {
  const { logs } = command;

  return {
    shouldShowInternalLogs: logs,
  };
};

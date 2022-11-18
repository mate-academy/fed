import { DeployOptions } from '../commands';
import { Controller } from './Controller';

export const deployController: Controller<DeployOptions> = (command) => {
  const { logs } = command;

  return {
    shouldShowInternalLogs: logs,
  };
};

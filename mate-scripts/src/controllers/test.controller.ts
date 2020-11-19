import { Controller } from './Controller';
import { TestOptions } from '../commands';

export const testController: Controller<TestOptions> = (command) => {
  const { 'not-open': notOpen, logs } = command;

  return { open: !notOpen, showLogs: logs };
};

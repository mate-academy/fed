import { LintCommand, Command } from '../commands';
import { Controller } from './Controller';
import { lintController } from './lint.controller';

const controllers = new Map<typeof Command, Controller<any>>();

controllers.set(LintCommand, lintController);

export * from './Controller.js';
export { controllers };

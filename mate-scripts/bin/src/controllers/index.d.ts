import { Command } from '../commands';
import { Controller } from './Controller';
declare const controllers: Map<typeof Command, Controller<any>>;
export * from './Controller.js';
export { controllers };

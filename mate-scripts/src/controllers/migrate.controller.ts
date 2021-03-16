import { MigrateOptions } from '../commands';
import { ProjectTypes } from '../typedefs';
import { Controller } from './Controller.js';

export const migrateController: Controller<MigrateOptions> = (command, projectType: ProjectTypes) => {
  return {
    projectType,
  };
};

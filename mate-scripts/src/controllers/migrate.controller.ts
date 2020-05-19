import { MigrateOptions } from '../commands';
import { ProjectTypes } from '../constants.js';
import { Controller } from './Controller.js';

export const migrateController: Controller<MigrateOptions> = (command, projectType: ProjectTypes) => {
  return {
    projectType,
  };
};

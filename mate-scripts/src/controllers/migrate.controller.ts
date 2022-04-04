import { MigrateOptions } from '../commands';
import { ProjectTypes } from '../typedefs';
import { Controller } from './Controller';

export const migrateController: Controller<MigrateOptions> = (
  command,
  projectType: ProjectTypes,
) => ({
  projectType,
});

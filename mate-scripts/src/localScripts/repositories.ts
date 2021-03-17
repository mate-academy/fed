import { ProjectTypes } from '../typedefs';
import repos from './repositoriesData.json';

export const repositories: Record<ProjectTypes, string[]> = {
  ...repos,
};

import { ProjectTypes } from '../constants';
import repos from './repositoriesData.json';

export const repositories: Record<ProjectTypes, string[]> = {
  ...repos
} as Record<ProjectTypes, string[]>;

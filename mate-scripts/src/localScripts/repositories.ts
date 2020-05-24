import { ProjectTypes } from '../constants';
import repos from './repositories-data.json';

export const repositories: Record<ProjectTypes, string[]> = {
  ...repos
} as Record<ProjectTypes, string[]>;

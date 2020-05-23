import { ProjectTypes } from '../constants.js';
import repos from './repositories.json';

export const repositories: Record<ProjectTypes, string[]> = {
  ...repos
} as Record<ProjectTypes, string[]>;

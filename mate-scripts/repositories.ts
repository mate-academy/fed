import { ProjectTypes } from './src/constants.js';

export const repositories: Record<ProjectTypes, string[]> = {
  none: [],
  layout: [
    'gulp-template',
    'layout_colored-blocks',
    'layout_hello-world'
  ],
  javascript: [],
  react: [],
  reactTypescript: []
};

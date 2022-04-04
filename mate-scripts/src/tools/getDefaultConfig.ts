import { defaultLintersConfig } from '../constants';
import { Config, Linters, ProjectTypes } from '../typedefs';

export const getDefaultConfig = (
  projectType = ProjectTypes.None,
): Config => ({
  projectType,
  linters: {
    ...getDefaultLintersConfig(projectType),
  },
});

function getDefaultLintersConfig(projectType: ProjectTypes): Linters {
  switch (projectType) {
    case ProjectTypes.Layout:
      return defaultLintersConfig;
    case ProjectTypes.LayoutDOM:
      return {
        ...defaultLintersConfig,
        bem: false,
      };
    case ProjectTypes.Javascript:
      return {
        ...defaultLintersConfig,
        bem: false,
      };
    case ProjectTypes.Typescript:
      return {
        ...defaultLintersConfig,
        bem: false,
      };
    case ProjectTypes.React:
      return {
        ...defaultLintersConfig,
        bem: false,
      };
    case ProjectTypes.ReactTypescript:
      return {
        ...defaultLintersConfig,
        bem: false,
      };
    default:
    case ProjectTypes.None:
      return defaultLintersConfig;
  }
}

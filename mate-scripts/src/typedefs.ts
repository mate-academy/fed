export enum ProjectTypes {
  None = 'none',
  Layout = 'layout',
  LayoutDOM = 'layoutDOM',
  Javascript = 'javascript',
  Typescript = 'typescript',
  React = 'react',
  ReactTypescript = 'reactTypescript',
}

export interface Linters {
  html: boolean;
  bem: boolean;
  styles: boolean;
  javascript: boolean;
}

export interface Config {
  projectType: ProjectTypes;
  linters: Linters;
}

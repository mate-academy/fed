export enum ProjectTypes {
  None = 'none',
  Layout = 'layout',
  LayoutDOM = 'layoutDOM',
  Javascript = 'javascript',
  Typescript = 'typescript',
  React = 'react',
  ReactTypescript = 'reactTypescript',
  NodeJs = 'nodeJs',
}

export enum NodeJsVersions {
  v14 = '14',
  v20 = '20',
}

export interface Linters {
  html: boolean;
  bem: boolean;
  styles: boolean;
  javascript: boolean;
  htmlLint: boolean;
  nodeJs: boolean;
}

export interface Tests {
  backstop: boolean;
  jest: boolean;
  cypress: boolean;
  cypressComponents: boolean;
}

export interface Config {
  projectType: ProjectTypes;
  nodejsMajorVersion: NodeJsVersions;
  homepage: string;
  linters: Linters;
  tests: Tests;
}

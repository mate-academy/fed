import { Linters, Tests } from './typedefs';

export const DESTINATION_DIR = 'dist';

export const servePort = 8080;

export const defaultLintersConfig: Linters = {
  html: true,
  bem: true,
  styles: true,
  javascript: true,
  htmlLint: false,
};

export const defaultTestsConfig: Tests = {
  jest: false,
  backstop: false,
  cypress: false,
  cypressComponents: false,
};

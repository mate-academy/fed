import { Config, Linters, ProjectTypes } from './typedefs';

export const DESTINATION_DIR = 'dist';

export const servePort = 8080;

export const defaultLintersConfig: Linters = {
  html: true,
  bem: true,
  styles: true,
  javascript: true,
};

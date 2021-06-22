import path from 'path';
import { DESTINATION_DIR, servePort } from '../constants';
import {
  execBashCodeSync,
  execBashCodeControlled,
  makeCLIOptions,
  ExecResult,
} from '../tools';

export interface ServeOptions {
  showLogs: boolean;
  open: boolean;
  port?: number;
  sync?: boolean;
}

export class ParcelService {
  private readonly baseOptions = {
    'out-dir': path.join(this.rootDir, DESTINATION_DIR),
  };

  private readonly source = path.join(this.rootDir, 'src/index.html');

  constructor(private readonly rootDir: string) {
  }

  serve<F extends boolean, R = ExecResult<F>>(
    passedOptions: ServeOptions,
    async?: F,
  ): R {
    const {
      showLogs,
      open,
      port,
    } = passedOptions;
    const options = {
      ...this.baseOptions,
      open,
      port: port || servePort,
    };

    return this.run(
      'serve',
      options,
      'development',
      showLogs,
      async,
    );
  }

  build(showLogs = false) {
    const options = {
      ...this.baseOptions,
      'public-url':  './',
    };

    this.run('build', options, 'production', showLogs);
  }

  private run<F extends boolean, R = ExecResult<F>>(
    command: string,
    options: Record<string, any>,
    env = 'development',
    showLogs = false,
    async?: F,
  ): R {
    const optionsString = makeCLIOptions(options);
    const source = ParcelService.escapePathSpaces(this.source);
    const commandWithOptions = `cross-env NODE_ENV=${env} npx parcel ${command} ${source} ${optionsString}`;

    if (showLogs) {
      console.log(commandWithOptions);
    }

    const execFn = async ? execBashCodeControlled : execBashCodeSync;

    return execFn(commandWithOptions, showLogs) as any;
  };

  private static escapePathSpaces(path: string) {
    return path.replace(' ', '\\ ');
  }
}

import path from 'path';
import { DESTINATION_DIR } from '../constants.js';
import { execBashCode, makeCLIOptions } from '../tools';

export class Parcel {
  private readonly baseOptions = {
    'out-dir': path.join(this.rootDir, DESTINATION_DIR),
  };

  private readonly source = path.join(this.rootDir, 'src/index.html');

  constructor(private readonly rootDir: string) {
  }

  serve() {
    const options = {
      ...this.baseOptions,
      open: true,
      port: 8080,
    };

    this.run('serve', options);
  }

  build() {
    this.run('build', this.baseOptions, 'production');
  }

  private run(command: string, options: Record<string, any>, env = 'development') {
    const optionsString = makeCLIOptions(options);
    const commandWithOptions = `NODE_ENV=${env} npx parcel ${command} ${this.source} ${optionsString}`;

    execBashCode(commandWithOptions);
  };
}

import path from 'path';
import {
  execBashCodeControlled, execBashCodeSync, ExecResult,
} from '../tools';

interface StartOptions {
  port?: number;
  open?: boolean;
  showLogs?: boolean;
}

export class ReactScriptsService {
  private readonly binDir = path.join(this.rootDir, 'node_modules/.bin/');

  constructor(private readonly rootDir: string) {
  }

  start<Async extends boolean, Result = ExecResult<Async>>(
    options: StartOptions = {},
    async: Async = false as Async,
  ): Result {
    const {
      port,
      open = true,
      showLogs = false,
    } = options;

    const execFn = async
      ? execBashCodeControlled
      : execBashCodeSync;

    const PORT = port
      ? `PORT=${port} `
      : '';

    const OPEN = open
      ? ''
      : 'BROWSER=none ';

    return execFn(
      `${PORT}${OPEN}${this.binDir}react-scripts start`,
      showLogs,
    ) as any;
  }

  build(
    buildPath?: string,
    showLogs = true,
  ) {
    const BUILD_PATH = buildPath
      ? `BUILD_PATH=./${buildPath} `
      : '';
    const command = `${BUILD_PATH}${this.binDir}react-scripts build`;

    if (showLogs) {
      console.log(`Execute command: ${command}`);
    }

    return execBashCodeSync(command);
  }
}

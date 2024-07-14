import path from 'path';
import {
  execBashCodeControlled, execBashCodeSync, ExecResult,
} from '../tools';

interface StartOptions {
  port?: number;
  open?: boolean;
  showLogs?: boolean;
}

export class ViteService {
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
      ? ` --port=${port}`
      : '';

    const OPEN = open
      ? ' --open'
      : '';

    return execFn(
      `${this.binDir}vite dev${PORT}${OPEN}`,
      showLogs,
    ) as any;
  }

  build(
    buildPath?: string,
    showLogs = true,
  ) {
    const BUILD_PATH = buildPath
      ? ` --out-dir ${buildPath}`
      : '';
    const command = `cross-env ${this.binDir}vite build${BUILD_PATH}`;

    if (showLogs) {
      console.log(`Execute command: ${command}`);
    }

    return execBashCodeSync(command);
  }
}

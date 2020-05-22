import { exec, execSync, ExecSyncOptions } from 'child_process';

export function execBashCode(bashCode: string, shouldBindStdout = true) {
  let options: ExecSyncOptions = {
    stdio: 'ignore',
  };

  if (shouldBindStdout) {
    options = {
      stdio: 'inherit',
      cwd: process.cwd(),
    };
  }

  const result = execSync(bashCode, options);

  return result
    ? result.toString()
    : result;
}

export function execBashCodeSilent(bashCode: string, shouldBindStdout = true) {
  try {
    return execBashCode(bashCode, shouldBindStdout);
  } catch (error) {
    process.exit(1);
  }
}

export function execBashCodeSafely(bashCode: string, shouldBindStdout = true) {
  try {
    return execBashCode(bashCode, shouldBindStdout);
  } catch (error) {
    // do nothing
  }
}

export interface ExecBashCodeAsyncParams {
  shouldBindStdout?: boolean;
  cwd?: string;
}

const defaultExecBashCodeAsyncParams = {
  shouldBindStdout: true,
  cwd: process.cwd(),
};

export function execBashCodeAsync(bashCode: string, params: ExecBashCodeAsyncParams = defaultExecBashCodeAsyncParams): Promise<void | string> {
  const {
    shouldBindStdout = true,
    cwd,
  } = params;

  return new Promise<void | string>(((resolve, reject) => {
    const execOptions = { cwd };
    const childProcess = exec(bashCode, execOptions);
    let stdout = '';

    if (shouldBindStdout) {
      if (childProcess.stdout) {
        childProcess.stdout.on('data', (data) => {
          stdout += data.toString();
          console.log(data);
        });
      }

      if (childProcess.stderr) {
        childProcess.stderr.on('data', (data) => {
          console.error(data);
        });
      }
    }

    childProcess.on('close',  (code) => {
      code > 0
        ? reject(new Error(`${bashCode}, errorCode: ${code}`))
        : resolve(stdout);
    });
  }))
}

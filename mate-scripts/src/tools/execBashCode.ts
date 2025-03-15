import {
  ChildProcess, exec, execSync, ExecSyncOptions,
} from 'child_process';

export type ExecResult<F extends boolean> = F extends true
  ? ChildProcess
  : string;

type ExecBashCodeSyncOuputResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export function execBashCodeSync(
  bashCode: string,
  shouldBindStdout = true,
  cwd = process.cwd(),
): string {
  let options: ExecSyncOptions = {
    stdio: 'ignore',
  };

  if (shouldBindStdout) {
    options = {
      stdio: 'inherit',
      cwd,
    };
  }

  const result = execSync(bashCode, options);

  return result
    ? result.toString()
    : result;
}

export function execBashCodeSilent(
  bashCode: string,
  shouldBindStdout = true,
) {
  try {
    return execBashCodeSync(bashCode, shouldBindStdout);
  } catch (error) {
    return process.exit(1);
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

export function execBashCodeAsync(
  bashCode: string,
  params: ExecBashCodeAsyncParams = defaultExecBashCodeAsyncParams,
): Promise<string> {
  const {
    shouldBindStdout = true,
    cwd,
  } = params;

  return new Promise<string>(((resolve, reject) => {
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

    childProcess.on('close', (code) => {
      if (code as number > 0) {
        reject(new Error(`${bashCode}, errorCode: ${code}`));
      } else {
        resolve(stdout);
      }
    });
  }));
}

export function execBashCodeAsyncWithOutput(
  bashCode: string,
  params: ExecBashCodeAsyncParams = defaultExecBashCodeAsyncParams,
): Promise<ExecBashCodeSyncOuputResult> {
  const {
    shouldBindStdout = true,
    cwd,
  } = params;

  return new Promise<ExecBashCodeSyncOuputResult>(((resolve, reject) => {
    const execOptions = { cwd };
    const childProcess = exec(bashCode, execOptions);
    let stdout = '';
    let stderr = '';

    if (childProcess.stdout) {
      childProcess.stdout.on('data', (data) => {
        stdout += data.toString();

        if (shouldBindStdout) {
          console.log(data);
        }
      });
    }

    if (childProcess.stderr) {
      childProcess.stderr.on('data', (data) => {
        stderr += data.toString();

        if (shouldBindStdout) {
          console.error(data);
        }
      });
    }

    childProcess.on('close', (code) => {
      resolve({
        stdout,
        stderr,
        exitCode: code as number,
      });
    });

    childProcess.on('error', (error) => {
      reject(new Error(`${bashCode}, error: ${error}`));
    });
  }));
}

export function execBashCodeControlled(
  bashCode: string,
  shouldBindStdout = true,
  cwd = process.cwd(),
): ChildProcess {
  const execOptions = { cwd };
  const childProcess = exec(bashCode, execOptions);

  if (shouldBindStdout) {
    if (childProcess.stdout) {
      childProcess.stdout.on('data', (data) => {
        console.log(data);
      });
    }

    if (childProcess.stderr) {
      childProcess.stderr.on('data', (data) => {
        console.error(data);
      });
    }
  }

  return childProcess;
}

import { execSync, ExecSyncOptions } from 'child_process';

export function execBashCode(bashCode: string, shouldBindStdout = true) {
  let options: ExecSyncOptions = {
    stdio: 'ignore',
  };

  if (shouldBindStdout) {
    options = {
      stdio: 'inherit',
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

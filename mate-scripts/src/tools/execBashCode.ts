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

  execSync(bashCode, options);
}

export function execBashCodeSilent(bashCode: string, shouldBindStdout = true) {
  try {
    execBashCode(bashCode, shouldBindStdout);
  } catch (error) {
    process.exit(1);
  }
}

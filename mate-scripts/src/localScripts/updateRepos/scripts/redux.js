const { execSync } = require('child_process');

async function main() {
  execBashCodeSync('npm rm redux');
  execBashCodeSync('npm i redux');
}

main();

function execBashCodeSync(
  bashCode,
  shouldBindStdout = true,
  cwd = process.cwd(),
) {
  let options = {
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

const { execSync } = require('child_process');

function main() {
  execBashCodeSync('npm i -D node-sass@6');
  execBashCodeSync('npm i react-scripts@4');
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

const { execSync } = require('child_process');

function main() {
  execBashCodeSync('npm i react-redux react-router-dom redux-devtools-extension');
  execBashCodeSync('npm i -D @types/react-redux @types/react-router-dom');
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

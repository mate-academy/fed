const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs-extra');

async function main() {
  const dir = process.cwd();

  await fs.copy(
    '/Users/yuriiholiuk/mate/fed/mate-scripts/src/localScripts/updateRepos/scripts/workflows',
    path.join(dir, '.github', 'workflows'),
    {
      recursive: true,
      overwrite: true,
    },
  );

  execBashCodeSync('git checkout origin/master checklist.md');
  execBashCodeSync('npm i -D @mate-academy/eslint-config-react@latest @mate-academy/eslint-config-react-typescript@latest');
  execBashCodeSync('npm i postcss@8.4.12 @mate-academy/scripts@latest');
  execBashCodeSync('npm rm react-scripts');
  execBashCodeSync('npm i react-scripts');
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

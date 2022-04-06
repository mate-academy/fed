const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs-extra');

function main() {
  const folderPath = process.cwd();
  const exec = makeExec(folderPath);
  const folderContent = fs.readdirSync(folderPath);

  folderContent.forEach((name) => {
    const itemPath = path.join(folderPath, name);

    if (name === '.github') {
      fs.rmdirSync(itemPath, {
        force: true,
        recursive: true,
      });

      return;
    }

    const stats = fs.lstatSync(itemPath);

    if (stats.isDirectory()) {
      return;
    }

    if (
      ![
        'package.json',
        'package-lock.json',
        'README.md',
        'readme.md',
        'Readme.md',
      ].includes(name)
    ) {
      fs.unlinkSync(itemPath, {
        force: true,
      });
    }
  });

  exec('npm rm lint-staged husky node-sass @types/node react-scripts typescript');
  exec('npm i react-scripts@latest react@17 react-dom@17 @cypress/react');
  exec('npm i -D cypress@latest @types/react@17 @types/react-dom@17 @cypress/webpack-dev-server @mate-academy/cypress-tools node-sass@latest mochawesome@latest mochawesome-report-generator@latest @types/node typescript');
  exec('npm i -D @mate-academy/scripts@latest');

  const packagePath = path.join(folderPath, 'package.json');
  const package = require(packagePath);

  delete package.husky;
  delete package['lint-staged'];
  delete package.eslintConfig;

  package.scripts.start = 'mate-scripts start -l';
  package.scripts.deploy = 'mate-scripts deploy';

  package.mateAcademy.tests = {
    _comment: 'Add `cypressComponents: true` to enable component tests',
    cypress: true,
  };

  fs.writeFileSync(
    packagePath,
    `${JSON.stringify(package, null, 2)}\n`,
    'utf-8',
  );

  exec('npm install');
  exec('npm audit fix');
}

main(process.argv[2]);

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

function makeExec(cwd) {
  return (bashCode, shouldBindStdout) => (
    execBashCodeSync(bashCode, shouldBindStdout, cwd)
  );
}

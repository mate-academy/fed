const path = require('path');
const fs = require('fs-extra');

function main() {
  const folderPath = process.cwd();

  const packagePath = path.join(folderPath, 'package.json');
  const pkg = require(packagePath);

  pkg.scripts.postinstall = 'npm run update && cypress verify';

  fs.writeFileSync(
    packagePath,
    `${JSON.stringify(pkg, null, 2)}\n`,
    'utf-8',
  );
}

main();

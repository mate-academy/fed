#!/usr/bin/env node

const fs = require('fs');
const pkg = require('./package');

const shebang = '#!/usr/bin/env node\n\n';
const executableFile = fs.readFileSync(pkg.main);
const executableFileWithShebang = shebang + executableFile;

fs.writeFileSync(
  pkg.main,
  executableFileWithShebang,
);

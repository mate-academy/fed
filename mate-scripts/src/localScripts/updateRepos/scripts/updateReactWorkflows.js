const path = require('path');
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
}

main()
  .catch(console.error);

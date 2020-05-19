import fs from 'fs';
import path from 'path';

const packageJson = 'package.json';
const rootDirError = 'Command should be run inside project folder with @mate-academy/scripts as devDependency';

export function getRootDir() {
  let rootDir = process.cwd();
  let folderContent = fs.readdirSync(rootDir);

  try {
    while (true) {
      if (isRoot(folderContent) && hasCorrectDependency(rootDir)) {
        break;
      }

      if (isSystemRoot(rootDir)) {
        throw new Error(rootDirError);
      }

      rootDir = path.join(rootDir, '../');
      folderContent = fs.readdirSync(rootDir);
    }
  } catch (error) {
    console.error(error.message);

    rootDir = process.cwd();
  }

  return rootDir;
}

function isRoot(folderContent: string[]) {
  return folderContent.includes(packageJson);
}

function hasCorrectDependency(rootDir: string) {
  if (process.env.NODE_ENV === 'test') {
    return true;
  }

  let packageFile;

  try {
    const packageFileContent = fs.readFileSync(
      path.join(rootDir, packageJson),
      { encoding: 'utf-8' },
    );

    packageFile = JSON.parse(packageFileContent);
  } catch (e) {
    packageFile = null;
  }

  return (
    packageFile
    && packageFile.devDependencies
    && packageFile.devDependencies['@mate-academy/scripts']
  );
}

function isSystemRoot(rootDir: string) {
  return rootDir === '/';
}

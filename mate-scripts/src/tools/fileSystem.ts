import path from 'path';
import fs from 'fs-extra';
import { Config } from '../typedefs';
import { getDefaultConfig } from './getDefaultConfig';

const packageJson = 'package.json';
const rootDirError = 'Command should be run inside project folder with @mate-academy/scripts as devDependency';

export function getRootDir() {
  let rootDir = process.cwd();
  let folderContent = fs.readdirSync(rootDir);

  try {
    // eslint-disable-next-line no-constant-condition
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
    console.error((error as any)?.message);

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

export function getConfig(rootDir: string): Config {
  const { mateAcademy, homepage } = JSON.parse(
    fs.readFileSync(
      path.join(rootDir, 'package.json'),
      { encoding: 'utf-8' },
    ),
  );

  const config = mateAcademy || {};
  const linters = config.linters || {};
  const tests = config.tests || {};
  const defaultConfig = getDefaultConfig(config.projectType);

  return {
    ...defaultConfig,
    homepage,
    ...config,
    linters: {
      ...defaultConfig.linters,
      ...linters,
    },
    tests: {
      ...defaultConfig.tests,
      ...tests,
    },
  };
}

export function readDirRecursive(
  pathLike: string,
  prefix = '',
): string[] {
  const dirPath = path.join(pathLike, prefix);
  const list = fs.readdirSync(dirPath);

  return list.flatMap((name) => {
    const fullPath = path.join(dirPath, name);
    const stats = fs.lstatSync(fullPath);
    const prefixedName = path.join(prefix, name);

    if (stats.isDirectory()) {
      return readDirRecursive(fullPath, prefixedName);
    }

    return prefixedName;
  });
}

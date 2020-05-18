import fs from 'fs-extra';
import path from "path";
import { execBashCodeSafely } from '../tools';

function safeRun(cb: Function) {
  try {
    cb();
  } catch (error) {
    console.error('Migration error', error);
  }
}

export default (rootDir: string) => {
  safeRun(() => (
    fs.copySync(
      path.join(rootDir, 'config/backstop/backstopConfig.js'),
      path.join(rootDir, 'backstopConfig.js'),
    )
  ));
  safeRun(() => (
    fs.removeSync(path.join(rootDir, 'config'))
  ));
  safeRun(() => (
    fs.removeSync(path.join(rootDir, 'server.js'))
  ));
  safeRun(() => (
    fs.removeSync(path.join(rootDir, '.travis.yml'))
  ));

  safeRun(() => {
    if (fs.existsSync(path.join(rootDir, 'readme.md'))) {
      fs.moveSync(
        path.join(rootDir, 'readme.md'),
        path.join(rootDir, 'README.md'),
      );
    }
  });

  execBashCodeSafely('npm rm @mate-academy/browsersync-config htmllint htmllint-cli husky lint-staged rimraf @mate-academy/htmllint-config');
  execBashCodeSafely('npm i -D @linthtml/linthtml @linthtml/gulp-linthtml gulp gulp-autoprefixer gulp-clean gulp-eslint gulp-replace-path gulp-sass gulp-sourcemaps gulp-stylelint stylelint-scss @mate-academy/linthtml-config');
}

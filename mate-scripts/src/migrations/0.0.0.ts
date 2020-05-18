import fs from 'fs-extra';
import path from "path";
import { execBashCodeSafely } from '../tools';

export default (rootDir: string) => {
  fs.copySync(
    path.join(rootDir, 'config/backstop/backstopConfig.js'),
    path.join(rootDir, 'backstopConfig.js'),
  );
  fs.removeSync(path.join(rootDir, 'config'));
  fs.removeSync(path.join(rootDir, 'server.js'));
  fs.removeSync(path.join(rootDir, '.travis.yml'));

  if (fs.existsSync(path.join(rootDir, 'readme.md'))) {
    fs.moveSync(
      path.join(rootDir, 'readme.md'),
      path.join(rootDir, 'README.md'),
    );
  }

  execBashCodeSafely('npm rm @mate-academy/browsersync-config htmllint htmllint-cli husky lint-staged rimraf');
  execBashCodeSafely('npm i -D @linthtml/linthtml @linthtml/gulp-linthtml gulp gulp-autoprefixer gulp-clean gulp-eslint gulp-replace-path gulp-sass gulp-sourcemaps gulp-stylelint stylelint-scss');
};

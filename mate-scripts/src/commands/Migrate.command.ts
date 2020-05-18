import fs from 'fs-extra';
import path from "path";
import { execBashCodeSafely } from '../tools';
import { Command } from './Command';

export class MigrateCommand extends Command {
  private static scripts = {
    init: 'mate-scripts init',
    start: 'mate-scripts start',
    lint: 'mate-scripts lint',
    'test:only': 'mate-scripts test',
    build: 'mate-scripts build',
    deploy: 'mate-scripts deploy',
    update: 'mate-scripts update',
    postinstall: 'npm run update',
    test: 'npm run lint && npm run test:only',
  };

  protected common() {
  }

  protected layout = (rootDir: string) => {
    MigrateCommand.safeRun(() => (
      fs.copySync(
        path.join(rootDir, 'config/backstop/backstopConfig.js'),
        path.join(rootDir, 'backstopConfig.js'),
      )
    ));
    MigrateCommand.safeRun(() => (
      fs.removeSync(path.join(rootDir, 'config'))
    ));
    MigrateCommand.safeRun(() => (
      fs.removeSync(path.join(rootDir, 'server.js'))
    ));
    MigrateCommand.safeRun(() => (
      fs.removeSync(path.join(rootDir, '.travis.yml'))
    ));

    MigrateCommand.safeRun(() => {
      if (fs.existsSync(path.join(rootDir, 'readme.md'))) {
        fs.moveSync(
          path.join(rootDir, 'readme.md'),
          path.join(rootDir, 'README.md'),
        );
      }
    });

    execBashCodeSafely('npm rm @mate-academy/browsersync-config htmllint htmllint-cli husky lint-staged rimraf @mate-academy/htmllint-config');
    execBashCodeSafely('npm i -D @linthtml/linthtml @linthtml/gulp-linthtml gulp gulp-autoprefixer gulp-clean gulp-eslint gulp-replace-path gulp-sass gulp-sourcemaps gulp-stylelint stylelint-scss @mate-academy/linthtml-config');

    const pkg = fs.readFileSync(path.join(rootDir, 'package.json'), { encoding: 'utf-8' });
    const parsedPkg = JSON.parse(pkg);

    parsedPkg.scripts = MigrateCommand.scripts;

    delete parsedPkg['lint-staged'];
    delete parsedPkg.husky;
  };

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};

  private static safeRun(cb: Function) {
    try {
      cb();
    } catch (error) {
      console.error('Migration error', error);
    }
  }
}

import fs from 'fs-extra';
import nodeFs from 'fs';
import path from "path";
import { ProjectTypes } from '../constants.js';
import { execBashCode } from '../tools';
import { Command } from './Command';

export interface MigrateOptions {
  projectType: ProjectTypes;
}

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

  private static mateConfig: Record<ProjectTypes, any> = {
    [ProjectTypes.None]: null,
    [ProjectTypes.Layout]: {
      mateAcademy: {
        projectType: ProjectTypes.Layout
      }
    },
    [ProjectTypes.Javascript]: {
      mateAcademy: {
        projectType: ProjectTypes.Javascript
      }
    },
    [ProjectTypes.React]: {
      mateAcademy: {
        projectType: ProjectTypes.React
      }
    },
    [ProjectTypes.ReactTypescript]: {
      mateAcademy: {
        projectType: ProjectTypes.ReactTypescript
      }
    },
  };

  protected common(options: MigrateOptions) {
    this[options.projectType]();
  }

  protected layout = () => {
    execBashCode('npm i -D @mate-academy/scripts');

    const pkg = fs.readFileSync(path.join(this.rootDir, 'package.json'), { encoding: 'utf-8' });
    const parsedPkg = JSON.parse(pkg);

    parsedPkg.scripts = MigrateCommand.scripts;

    delete parsedPkg['lint-staged'];
    delete parsedPkg.husky;

    nodeFs.writeFileSync(
      path.join(this.rootDir, 'package.json'),
      JSON.stringify({
        ...parsedPkg,
        ...MigrateCommand.mateConfig.layout,
      }, null, 2),
    );

    MigrateCommand.safeRun(() => (
      fs.copySync(
        path.join(this.rootDir, 'config/backstop/backstopConfig.js'),
        path.join(this.rootDir, 'backstopConfig.js'),
      )
    ));
    MigrateCommand.safeRun(() => (
      fs.removeSync(path.join(this.rootDir, 'config'))
    ));
    MigrateCommand.safeRun(() => (
      fs.removeSync(path.join(this.rootDir, 'server.js'))
    ));
    MigrateCommand.safeRun(() => (
      fs.removeSync(path.join(this.rootDir, '.travis.yml'))
    ));

    execBashCode('npm rm @mate-academy/browsersync-config htmllint htmllint-cli husky lint-staged rimraf @mate-academy/htmllint-config');
    execBashCode('npm i -D @linthtml/linthtml @linthtml/gulp-linthtml gulp gulp-autoprefixer gulp-clean gulp-eslint gulp-replace-path gulp-sass gulp-sourcemaps gulp-stylelint stylelint-scss @mate-academy/linthtml-config');
    execBashCode('npm i');
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

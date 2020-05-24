import fs from 'fs-extra';
import { promises as nodeFs } from 'fs';
import path from "path";
import { ProjectTypes } from '../constants';
import { execBashCodeAsync } from '../tools';
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

  protected async common(options: MigrateOptions) {
    await this[options.projectType]();
  }

  protected layout = async () => {
    await execBashCodeAsync('npm i -D @mate-academy/scripts');

    const pkg = await fs.readFile(path.join(this.rootDir, 'package.json'), { encoding: 'utf-8' });
    const parsedPkg = JSON.parse(pkg);

    parsedPkg.scripts = MigrateCommand.scripts;

    delete parsedPkg['lint-staged'];
    delete parsedPkg.husky;

    await nodeFs.writeFile(
      path.join(this.rootDir, 'package.json'),
      JSON.stringify({
        ...parsedPkg,
        ...MigrateCommand.mateConfig.layout,
      }, null, 2),
    );

    await Promise.all([
      MigrateCommand.safeRun(
        fs.copy(
          path.join(this.rootDir, 'config/backstop/backstopConfig.js'),
          path.join(this.rootDir, 'backstopConfig.js'),
        ),
      ),
      MigrateCommand.safeRun(
        fs.remove(path.join(this.rootDir, 'config')),
      ),
      MigrateCommand.safeRun(
        fs.remove(path.join(this.rootDir, 'server.js')),
      ),
      MigrateCommand.safeRun(
        fs.remove(path.join(this.rootDir, '.travis.yml')),
      ),
      MigrateCommand.safeRun(
        fs.remove(path.join(this.rootDir, 'gulpfile.js')),
      ),
      MigrateCommand.safeRun(
        fs.remove(path.join(this.rootDir, '.linthtmlrc')),
      ),
    ]);

    await execBashCodeAsync('npm rm @linthtml/gulp-linthtml gulp-autoprefixer gulp-clean gulp-eslint gulp-replace-path gulp-sass gulp-sourcemaps gulp-stylelint gulp @mate-academy/browsersync-config htmllint htmllint-cli husky lint-staged rimraf @mate-academy/htmllint-config');
    await execBashCodeAsync('npm i -D @linthtml/linthtml stylelint-scss @mate-academy/linthtml-config node-sass parcel');
    await execBashCodeAsync('npm i');
  };

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};

  private static async safeRun(promise: Promise<any>) {
    try {
      await promise;
    } catch (error) {
      console.error('Migration error', error);
    }

    return true;
  }
}

import { promises as nodeFs } from 'fs';
import path from 'path';
import fs from 'fs-extra';
import { emptyFn, execBashCodeAsync } from '../tools';
import { Command } from './Command';
import { ProjectTypes } from '../typedefs';

export interface MigrateOptions {
  projectType: ProjectTypes;
}

export class MigrateCommand extends Command {
  private static scripts = {
    layout: {
      init: 'mate-scripts init',
      start: 'mate-scripts start',
      lint: 'mate-scripts lint',
      'test:only': 'mate-scripts test',
      build: 'mate-scripts build',
      deploy: 'mate-scripts deploy',
      update: 'mate-scripts update',
      postinstall: 'npm run update',
      test: 'npm run lint && npm run test:only',
    },
    javascript: {
      init: 'mate-scripts init',
      start: 'mate-scripts start',
      lint: 'mate-scripts lint',
      'test:only': 'mate-scripts test',
      update: 'mate-scripts update',
      postinstall: 'npm run update',
      test: 'npm run lint && npm run test:only',
    },
    nodeJs: {
      init: 'mate-scripts init',
      start: 'mate-scripts start',
      lint: 'mate-scripts lint',
      'test:only': 'mate-scripts test',
      update: 'mate-scripts update',
      postinstall: 'npm run update',
      test: 'npm run lint && npm run test:only',
    },
  };

  private static mateConfig: Record<ProjectTypes, any> = {
    [ProjectTypes.None]: null,
    [ProjectTypes.Layout]: {
      mateAcademy: {
        projectType: ProjectTypes.Layout,
      },
    },
    [ProjectTypes.LayoutDOM]: {
      mateAcademy: {
        projectType: ProjectTypes.LayoutDOM,
      },
    },
    [ProjectTypes.Javascript]: {
      mateAcademy: {
        projectType: ProjectTypes.Javascript,
      },
    },
    [ProjectTypes.React]: {
      mateAcademy: {
        projectType: ProjectTypes.React,
      },
    },
    [ProjectTypes.ReactTypescript]: {
      mateAcademy: {
        projectType: ProjectTypes.ReactTypescript,
      },
    },
    [ProjectTypes.Vue]: {
      mateAcademy: {
        projectType: ProjectTypes.Vue,
      },
    },
    [ProjectTypes.VueTypescript]: {
      mateAcademy: {
        projectType: ProjectTypes.VueTypescript,
      },
    },
    [ProjectTypes.Typescript]: {
      mateAcademy: {
        projectType: ProjectTypes.Typescript,
      },
    },
    [ProjectTypes.NodeJs]: {
      mateAcademy: {
        projectType: ProjectTypes.NodeJs,
      },
    },
  };

  protected async common(options: MigrateOptions) {
    await this[options.projectType]();
  }

  protected layout = async () => {
    await execBashCodeAsync('npm i -D @mate-academy/scripts');

    const pkg = await this.getPackage();

    pkg.scripts = MigrateCommand.scripts.layout;

    delete pkg['lint-staged'];
    delete pkg.husky;

    await nodeFs.writeFile(
      path.join(this.rootDir, 'package.json'),
      JSON.stringify({
        ...pkg,
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

  protected layoutDOM = async () => {
    const pkg = await this.getPackage();

    await nodeFs.writeFile(
      path.join(this.rootDir, 'package.json'),
      JSON.stringify({
        ...pkg,
        ...MigrateCommand.mateConfig.layoutDOM,
      }, null, 2),
    );

    await execBashCodeAsync('npm rm backstopjs @mate-academy/backstop-config gulp-htmllint');
    await execBashCodeAsync(`rm -rf ${path.join(this.rootDir, 'backstopConfig.js')}`);
    await execBashCodeAsync('npm i -D cypress eslint-plugin-cypress mochawesome mochawesome-merge mochawesome-report-generator');

    await execBashCodeAsync(`mkdir ${path.join(this.rootDir, 'cypress')}`);
    await execBashCodeAsync(`mkdir ${path.join(this.rootDir, 'cypress', 'integration')}`);
    await execBashCodeAsync(`cp ${path.join(__dirname, '../', 'configs', 'custom', ProjectTypes.LayoutDOM, 'page.spec.js')} ${path.join(this.rootDir, 'cypress', 'integration', 'page.spec.js')}`);
    await execBashCodeAsync('npm i');
  };

  protected javascript = async () => {
    await execBashCodeAsync('npm i -D @mate-academy/scripts');

    const pkg = await this.getPackage();

    pkg.scripts = MigrateCommand.scripts.javascript;

    delete pkg['lint-staged'];
    delete pkg.husky;

    await nodeFs.writeFile(
      path.join(this.rootDir, 'package.json'),
      JSON.stringify({
        ...pkg,
        ...MigrateCommand.mateConfig.javascript,
      }, null, 2),
    );

    await MigrateCommand.safeRun(
      fs.remove(path.join(this.rootDir, '.travis.yml')),
    );

    await execBashCodeAsync('npm rm husky lint-staged');
    await execBashCodeAsync('npm i');
    await execBashCodeAsync(`${this.binDir}eslint ./ --fix`);
  };

  protected nodeJs = async () => {
    await execBashCodeAsync('npm i -D @mate-academy/scripts');

    const pkg = await this.getPackage();

    pkg.scripts = MigrateCommand.scripts.nodeJs;

    delete pkg['lint-staged'];
    delete pkg.husky;

    await nodeFs.writeFile(
      path.join(this.rootDir, 'package.json'),
      JSON.stringify({
        ...pkg,
        ...MigrateCommand.mateConfig.nodeJs,
      }, null, 2),
    );

    await MigrateCommand.safeRun(
      fs.remove(path.join(this.rootDir, '.travis.yml')),
    );

    await execBashCodeAsync('npm rm husky lint-staged');
    await execBashCodeAsync('npm i');
    await execBashCodeAsync(`${this.binDir}eslint ./ --fix`);
  };

  async getPackage(): Promise<any> {
    const pkg = await fs.readFile(path.join(this.rootDir, 'package.json'), { encoding: 'utf-8' });

    return JSON.parse(pkg);
  }

  protected react = emptyFn;

  protected reactTypescript = emptyFn;

  protected vue = emptyFn;

  protected vueTypescript = emptyFn;

  private static async safeRun(promise: Promise<any>) {
    try {
      await promise;
    } catch (error) {
      console.error('Migration error', error);
    }

    return true;
  }
}

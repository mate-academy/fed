import path from 'path';
import fs from 'fs-extra';
import { DESTINATION_DIR } from '../constants';
import { ParcelService, ReactScriptsService } from '../services';
import { Command } from './Command';
import { NodeJsVersions } from '../typedefs';
import { ViteService } from '../services/Vite.service';

export interface BuildOptions {
  shouldShowInternalLogs: boolean;
}

export class BuildCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);

  private readonly reactScripts = new ReactScriptsService(this.rootDir);

  private readonly vite = new ViteService(this.rootDir);

  protected common(): void {
    // do nothing
  }

  protected layout = (options: BuildOptions) => {
    fs.removeSync(path.join(this.rootDir, DESTINATION_DIR));

    this.parcel.build(options.shouldShowInternalLogs);
  };

  protected layoutDOM = (options: BuildOptions) => {
    this.layout(options);
  };

  private buildReactScripts(showInternalLogs = false) {
    if (showInternalLogs) {
      console.log('START react-scripts build');
    }

    this.reactScripts.build(DESTINATION_DIR, showInternalLogs);
  }

  private buildVite(showInternalLogs = false) {
    if (showInternalLogs) {
      console.log('START vite build');
    }

    this.vite.build(DESTINATION_DIR, this.config.homepage, showInternalLogs);
  }

  protected react = (options: BuildOptions) => {
    if (this.config.nodejsMajorVersion === NodeJsVersions.v20) {
      this.buildVite(options.shouldShowInternalLogs);
    } else {
      this.buildReactScripts(options.shouldShowInternalLogs);
    }
  };

  protected reactTypescript = (options: BuildOptions) => {
    this.react(options);
  };

  protected vue = (options: BuildOptions) => {
    this.buildVite(options.shouldShowInternalLogs);
  };

  protected vueTypescript = (options: BuildOptions) => {
    this.vue(options);
  };
}

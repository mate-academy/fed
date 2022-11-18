import path from 'path';
import fs from 'fs-extra';
import { DESTINATION_DIR } from '../constants';
import { ParcelService, ReactScriptsService } from '../services';
import { Command } from './Command';

export interface BuildOptions {
  shouldShowInternalLogs: boolean;
}

export class BuildCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);

  private reactScripts = new ReactScriptsService(this.rootDir);

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

  protected react = (options: BuildOptions) => {
    if (options.shouldShowInternalLogs) {
      console.log('START react-scripts build');
    }

    this.reactScripts.build(DESTINATION_DIR, options.shouldShowInternalLogs);
  };

  protected reactTypescript = (options: BuildOptions) => {
    this.react(options);
  };
}

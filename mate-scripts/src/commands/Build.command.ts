import fs from 'fs-extra';
import path from 'path';
import { DESTINATION_DIR } from '../constants';
import { ParcelService, ReactScriptsService } from '../services';
import { Command } from './Command';

export interface BuildOptions {
  shouldShowInternalLogs: boolean;
}

export class BuildCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);

  private reactScripts = new ReactScriptsService();

  protected common() {}

  protected layout = (options: BuildOptions) => {
    fs.removeSync(path.join(this.rootDir, DESTINATION_DIR));

    this.parcel.build(options.shouldShowInternalLogs);
  };

  protected layoutDOM = (options: BuildOptions) => {
    this.layout(options);
  };

  protected react = () => {
    this.reactScripts.build();
  };

  protected reactTypescript = () => {
    this.reactScripts.build();
  };
}

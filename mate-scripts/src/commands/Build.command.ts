import fs from 'fs-extra';
import path from 'path';
import { DESTINATION_DIR } from '../constants.js';
import { ParcelService } from '../services';
import { Command } from './Command';

export class BuildCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);

  protected common() {
  }

  layout = () => {
    fs.removeSync(path.join(this.rootDir, DESTINATION_DIR));

    this.parcel.build();
  };
}

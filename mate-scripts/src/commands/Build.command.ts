import fs from 'fs-extra';
import path from 'path';
import { DESTINATION_DIR } from '../constants.js';
import { Parcel } from '../services/Parcel';
import { Command } from './Command';

export class BuildCommand extends Command {
  private readonly parcel = new Parcel(this.rootDir);

  protected common() {
  }

  layout = () => {
    fs.removeSync(path.join(this.rootDir, DESTINATION_DIR));

    this.parcel.build();
  };
}

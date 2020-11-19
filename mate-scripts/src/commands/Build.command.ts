import fs from 'fs-extra';
import path from 'path';
import { DESTINATION_DIR } from '../constants';
import { ParcelService } from '../services';
import { Command } from './Command';

export class BuildCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);

  protected common() {
  }

  protected layout = () => {
    fs.removeSync(path.join(this.rootDir, DESTINATION_DIR));

    this.parcel.build();
  };

  protected layoutDOM = () => {
    this.layout();
  }
}

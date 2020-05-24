import { Parcel } from '../services/Parcel.js';
import { Command } from './Command';

export class StartCommand extends Command {
  private readonly parcel = new Parcel(this.rootDir);

  protected common() {
  }

  protected layout = () => {
    this.parcel.serve();
  };
}

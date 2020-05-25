import { ParcelService } from '../services';
import { Command } from './Command';

export class StartCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);

  protected common() {
  }

  protected layout = () => {
    this.parcel.serve();
  };
}

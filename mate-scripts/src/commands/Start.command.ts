import { JestService, ParcelService } from '../services';
import { Command } from './Command';

export class StartCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);
  private readonly jest = new JestService();

  protected common() {
  }

  protected layout = () => {
    this.parcel.serve();
  };

  protected javascript = () => {
    this.jest.watch();
  };
}

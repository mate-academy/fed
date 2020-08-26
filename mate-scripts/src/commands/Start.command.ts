import { JestService, ParcelService } from '../services';
import { Command } from './Command';

export interface StartOptions {
  shouldShowInternalLogs: boolean;
  open: boolean;
}

export class StartCommand extends Command {
  private readonly parcel = new ParcelService(this.rootDir);
  private readonly jest = new JestService();

  protected common() {
  }

  protected layout = (options: StartOptions) => {
    this.parcel.serve({
      showLogs: options.shouldShowInternalLogs,
      open: options.open,
    });
  };

  protected javascript = () => {
    this.jest.watch();
  };
}

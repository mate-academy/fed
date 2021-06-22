import { JestService, ParcelService } from '../services';
import { Command } from './Command';
import { ChildProcess } from "child_process";
import { ExecResult } from '../tools';

export interface StartOptions {
  shouldShowInternalLogs: boolean;
  open: boolean;
  port?: number;
}

export class StartCommand extends Command {
  parcel = new ParcelService(this.rootDir);
  private readonly jest = new JestService();

  protected common() {
  }

  layout = <F extends boolean, R = ExecResult<F>>(
    options: StartOptions,
    async?: F,
  ): R => {
    return this.parcel.serve({
      showLogs: options.shouldShowInternalLogs,
      open: options.open,
      port: options.port,
    }, async);
  };

  layoutDOM = (options: StartOptions) => {
    this.layout(options);
  };

  protected javascript = () => {
    this.jest.watch();
  };
}

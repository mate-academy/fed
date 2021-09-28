import { JestService, ParcelService, ReactScriptsService } from '../services';
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
  private readonly reactScripts = new ReactScriptsService();

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

  react = () => {
    this.reactScripts.start();
  }

  reactTypescript = () => {
    this.reactScripts.start();
  }


  protected javascript = () => {
    this.jest.watch();
  };
}

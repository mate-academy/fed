import { JestService, ParcelService, ReactScriptsService } from '../services';
import { Command } from './Command';
import { ExecResult } from '../tools';
import { NodeJsVersions } from '../typedefs';
import { ViteService } from '../services/Vite.service';

export interface StartOptions {
  shouldShowInternalLogs: boolean;
  open: boolean;
  port?: number;
}

export class StartCommand extends Command {
  parcel = new ParcelService(this.rootDir);

  private readonly jest = new JestService();

  private readonly reactScripts =
    this.config.nodejsMajorVersion === NodeJsVersions.v20
      ? new ViteService(this.rootDir)
      : new ReactScriptsService(this.rootDir);

  protected common(): void {
    // do nothing
  }

  layout = <F extends boolean, R = ExecResult<F>>(
    options: StartOptions,
    async?: F,
  ): R => this.parcel.serve({
    showLogs: options.shouldShowInternalLogs,
    open: options.open,
    port: options.port,
  }, async);

  layoutDOM = (options: StartOptions) => {
    this.layout(options);
  };

  react = <
    Async extends boolean,
    Result = ExecResult<Async>
  >(options: StartOptions, async?: Async): Result => (
    this.reactScripts.start({
      showLogs: options.shouldShowInternalLogs,
      open: options.open,
      port: options.port,
    }, async)
  );

  reactTypescript = <
    Async extends boolean,
    Result = ExecResult<Async>
  >(options: StartOptions, async?: Async): Result => this.react(options, async);

  protected javascript = () => {
    this.jest.watch();
  };
}

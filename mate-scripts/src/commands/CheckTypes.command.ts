import { Command } from './Command';
import { execBashCodeSilent } from '../tools';

export type CheckTypesOptions = Record<string, unknown>;

export class CheckTypesCommand extends Command {
  protected common(): void {
    // do nothing
  }

  protected reactTypescript = () => {
    this.checkTypes();
  };

  protected vueTypescript = () => {
    this.checkTypes();
  };

  protected typescript = () => {
    this.checkTypes();
  };

  private checkTypes() {
    execBashCodeSilent(
      `${this.binDir}tsc --noEmit`,
    );
  }
}

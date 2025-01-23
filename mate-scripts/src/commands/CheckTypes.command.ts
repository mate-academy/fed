import { Command } from './Command';
import {execBashCodeSilent} from "../tools";

export type CheckTypesOptions = Record<string, unknown>;

export class CheckTypesCommand extends Command {
  protected common(): void {
    // do nothing
  }

  protected reactTypescript = (options: CheckTypesOptions) => {
    this.checkTypes();
  };


  protected vueTypescript = (options: CheckTypesOptions) => {
    this.checkTypes();
  };


  protected typescript = (options: CheckTypesOptions) => {
    this.checkTypes();
  };

  private checkTypes() {
    execBashCodeSilent(
      `${this.binDir}tsc --no-emit`,
    );
  }

}

import { Command as Commander } from 'commander';
import { CommandConstructor, Command } from './commands';
import { controllers } from './controllers';
import { getRootDir } from './tools/getRootDir';

export class CommandRunner {
  private _rootDir?: string;

  private get rootDir() {
    if (!this._rootDir) {
      this._rootDir = getRootDir();
    }

    return this._rootDir;
  }

  private commands = new Map<typeof Command, Command>();

  make(CommandClass: CommandConstructor) {
    return (commanderCommand: Commander) => {
      return this.runCommand(CommandClass, commanderCommand)
    };
  }

  private async runCommand(CommandClass: CommandConstructor, commanderCommand?: Commander) {
    const command = this.getCommand(CommandClass);

    if (CommandClass.requiredCommands) {
      for (let RequiredCommand of CommandClass.requiredCommands) {
        await this.runCommand(RequiredCommand);
      }
    }

    const controller = controllers.get(CommandClass);

    if (controller && commanderCommand) {
      return command.run(controller(commanderCommand));
    }

    return command.run();
  }

  private getCommand(CommandClass: CommandConstructor): Command {
    return this.commands.get(CommandClass)
      || this.makeCommand(CommandClass);
  }

  private makeCommand(CommandClass: CommandConstructor) {
    const command = new CommandClass(this.rootDir);

    this.commands.set(CommandClass, command);

    return command;
  }
}

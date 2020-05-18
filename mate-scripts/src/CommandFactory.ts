import { Command as Commander } from 'commander';
import { CommandConstructor } from './commands';
import { Controller } from './controllers';
import { getRootDir } from './tools';

export class CommandFactory {
  private readonly rootDir: string;

  constructor() {
    this.rootDir = getRootDir();
  }

  make(CommandClass: CommandConstructor, controller?: Controller<any>) {
    const command = new CommandClass(this.rootDir);

    if (!controller) {
      return () => command.run();
    }

    return (...args: any[]) => {
      const commanderCommand = args.pop() as Commander;
      const commandOptions = controller(commanderCommand, ...args);

      return command.run(commandOptions);
    };
  }
}

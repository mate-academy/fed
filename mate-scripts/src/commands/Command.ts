export abstract class Command {
  protected readonly rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  child<C extends Command>(CommandClass: CommandConstructor<C>): C {
    return new CommandClass(this.rootDir);
  }

  abstract async run(options?: any): Promise<void>;
}

export interface CommandConstructor<C extends Command = Command> {
  new (rootDir: string): C;
}

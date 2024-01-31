import path from 'path';
import { getConfig } from '../tools';
import { Config, ProjectTypes } from '../typedefs';

export abstract class Command {
  protected readonly rootDir: string;

  protected readonly binDir: string;

  protected readonly config: Config;

  private logNoImplementationWarning = () => {
    console.warn(
      `No implementation for command ${this.constructor.name} for ${this.config.projectType} project`,
    );
  };

  protected [ProjectTypes.None]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.Layout]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.LayoutDOM]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.Javascript]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.Typescript]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.React]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.ReactTypescript]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  protected [ProjectTypes.NodeJs]: (options?: any) => void = (
    this.logNoImplementationWarning
  );

  constructor(rootDir: string) {
    this.rootDir = rootDir;
    this.binDir = path.join(rootDir, 'node_modules/.bin/');
    this.config = getConfig(rootDir);
  }

  protected abstract common(options?: any): void;

  async run(options?: any): Promise<void> {
    this.checkProjectType();

    try {
      await this.common(options);
      await this[this.config.projectType](options);
    } catch (error) {
      process.exit(1);
    }
  }

  private checkProjectType() {
    if (this.config.projectType !== ProjectTypes.None) {
      return;
    }

    Command.logProjectTypeWarning();
  }

  private static logProjectTypeWarning() {
    console.warn(
      `package.json should contain
{
  ...
  "mateAcademy": {
    "projectType": "layout" | "javascript" | "react" | "reactTypescript" | "typescript" | "layoutDOM" | "nodeJs"
  }
}
`,
    );
  }

  child<C extends Command>(CommandClass: CommandConstructor<C>): C {
    return new CommandClass(this.rootDir);
  }
}

export interface CommandConstructor<C extends Command = Command> {
  new (rootDir: string): C;
}

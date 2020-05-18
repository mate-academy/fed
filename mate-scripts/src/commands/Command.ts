import fs from 'fs-extra';
import path from 'path';
import { ProjectTypes } from '../constants.js';

export abstract class Command {
  protected readonly rootDir: string;

  protected projectType: ProjectTypes = ProjectTypes.None;

  private logNoImplementationWarning = () => {
    console.warn(`No implementation for command ${this.constructor.name} for ${this.projectType} project`);
  };

  protected [ProjectTypes.None]: (options?: any) => void = this.logNoImplementationWarning;

  protected [ProjectTypes.Layout]: (options?: any) => void = this.logNoImplementationWarning;

  protected [ProjectTypes.Javascript]: (options?: any) => void = this.logNoImplementationWarning;

  protected [ProjectTypes.React]: (options?: any) => void = this.logNoImplementationWarning;

  protected [ProjectTypes.ReactTypescript]: (options?: any) => void = this.logNoImplementationWarning;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  protected abstract common(options?: any): void;

  async run(options?: any): Promise<void> {
    this.setProjectType();

    await this.common(options);
    await this[this.projectType](options);
  };

  private setProjectType() {
    if (this.projectType !== ProjectTypes.None) {
      return;
    }

    const { mateAcademy } = JSON.parse(
      fs.readFileSync(
        path.join(this.rootDir, 'package.json'),
        { encoding: 'utf-8' },
      ),
    );

    if (!mateAcademy || !mateAcademy.projectType) {
      Command.logProjectTypeWarning();
      return;
    }

    this.projectType = mateAcademy.projectType;
  }

  private static logProjectTypeWarning() {
    console.warn(
`package.json should contain
{
  ...
  "mateAcademy": {
    "projectType": "layout" | "javascript" | "react" | "reactTypescript"
  }
}
`
    );
  }

  child<C extends Command>(CommandClass: CommandConstructor<C>): C {
    return new CommandClass(this.rootDir);
  }
}

export interface CommandConstructor<C extends Command = Command> {
  new (rootDir: string): C;
}

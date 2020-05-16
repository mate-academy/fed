import { CommandConstructor } from './commands';
export declare class CommandRunner {
    private _rootDir?;
    private get rootDir();
    private commands;
    make(CommandClass: CommandConstructor): (...args: any[]) => Promise<void>;
    private runCommand;
    private getCommand;
    private makeCommand;
}

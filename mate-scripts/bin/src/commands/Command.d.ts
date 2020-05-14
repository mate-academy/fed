export declare abstract class Command {
    rootDir: string;
    constructor(rootDir: string);
    abstract run(options?: any): Promise<void>;
}
export interface CommandConstructor<C extends Command = Command> {
    requiredCommands?: CommandConstructor[];
    new (rootDir: string): C;
}

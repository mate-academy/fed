import { BuildCommand } from './Build.command';
import { Command } from './Command';
export declare class DeployCommand extends Command {
    static requiredCommands: (typeof BuildCommand)[];
    run(): Promise<void>;
}

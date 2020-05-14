import { Command } from './Command';
export declare class InitCommand extends Command {
    private static packagesPaths;
    private static configFileNames;
    run(): Promise<void>;
    private copyConfigs;
    private copyCommonConfigs;
    private copyLayoutConfigs;
    private copyLinthtmlConfig;
    private initBackstop;
    private initGitHooks;
}

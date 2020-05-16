import { Command } from './Command';
export interface LintOptions {
    html: boolean;
    styles: boolean;
    javascript: boolean;
    files?: string[];
}
export declare class LintCommand extends Command {
    srcDir: string;
    run(options: LintOptions): Promise<void>;
    private static lintHtml;
    private static lintStyles;
    private static lintJs;
}

import { Command } from './Command';
export interface LintOptions {
    html: boolean;
    styles: boolean;
    javascript: boolean;
}
export declare class LintCommand extends Command {
    run(options: LintOptions): Promise<void>;
    private lintHtml;
    private lintStyles;
    private lintJs;
}

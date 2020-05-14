import { spawn } from 'child_process';
import { Command } from './Command';

export class StartCommand extends Command {
  async run(): Promise<void> {
    spawn('gulp', { stdio: 'inherit' });
  }
}

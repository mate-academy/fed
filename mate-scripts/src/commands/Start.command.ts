import { DESTINATION_DIR } from '../constants.js';
import { GulpService } from '../services';
import { Command } from './Command';

export class StartCommand extends Command {
  private readonly gulp = new GulpService(this.rootDir);

  protected common() {
  }

  protected layout = () => {
    this.gulp.serve(DESTINATION_DIR);
  };
}

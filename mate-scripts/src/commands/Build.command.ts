import { DESTINATION_DIR } from '../constants.js';
import { GulpService } from '../services';
import { Command } from './Command';

export class BuildCommand extends Command {
  private readonly gulp = new GulpService(this.rootDir);

  protected common() {
  }

  layout = () => {
    this.gulp.build(DESTINATION_DIR);
  };
}

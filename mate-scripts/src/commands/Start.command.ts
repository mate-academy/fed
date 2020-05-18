import { DESTINATION_DIR } from '../constants.js';
import { Gulp } from '../Gulp.js';
import { Command } from './Command';

export class StartCommand extends Command {
  private readonly gulp = new Gulp(this.rootDir);

  protected common() {
  }

  protected layout = () => {
    this.gulp.serve(DESTINATION_DIR);
  };
}

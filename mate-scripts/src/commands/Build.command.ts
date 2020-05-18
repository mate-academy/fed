import { DESTINATION_DIR } from '../constants.js';
import { Gulp } from '../Gulp.js';
import { Command } from './Command';

export class BuildCommand extends Command {
  private readonly gulp = new Gulp(this.rootDir);

  protected common() {
  }

  layout = () => {
    this.gulp.build(DESTINATION_DIR);
  };
}

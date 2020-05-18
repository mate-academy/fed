import { migrations } from '../migrations';
import { Command } from './Command';

export class MigrateCommand extends Command {
  common() {
    migrations.forEach((migration) => migration(this.rootDir, this.projectType))
  }

  protected layout = () => {};

  protected javascript = () => {};

  protected react = () => {};

  protected reactTypescript = () => {};
}

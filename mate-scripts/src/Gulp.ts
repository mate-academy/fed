import { DESTINATION_DIR } from './constants.js';
import { execBashCode } from './tools/execBashCode.js';

export class Gulp {
  private static __instance: Gulp;

  constructor(private readonly rootDir: string) {
    if (!Gulp.__instance) {
      Gulp.__instance = this;
    }

    return Gulp.__instance;
  }

  build(destinationDir = DESTINATION_DIR) {
    execBashCode(`gulp build --destination ${destinationDir}`);
  }

  serve(destinationDir = DESTINATION_DIR) {
    execBashCode(`gulp --destination ${destinationDir}`);
  }
}

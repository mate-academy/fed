import { DESTINATION_DIR } from '../constants.js';
import { execBashCode } from '../tools';

export class GulpService {
  private static __instance: GulpService;

  constructor(private readonly rootDir: string) {
    if (!GulpService.__instance) {
      GulpService.__instance = this;
    }

    return GulpService.__instance;
  }

  build(destinationDir = DESTINATION_DIR) {
    execBashCode(`gulp build --destination ${destinationDir}`);
  }

  serve(destinationDir = DESTINATION_DIR) {
    execBashCode(`gulp --destination ${destinationDir}`);
  }
}

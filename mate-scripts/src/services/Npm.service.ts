import { execBashCodeAsync, Semver } from '../tools';

export interface PackageVersions {
  available: Semver;
  global: Semver | null;
  local: Semver | null;
}

export class NpmService {
  constructor(private packageName: string) {}

  async getVersions(): Promise<PackageVersions> {
    const [
      availableVersion,
      globalVersion,
      localVersion,
    ] = await Promise.all([
      this.getAvailableVersion(),
      this.getGlobalVersion(),
      this.getLocalVersion(),
    ]);

    return {
      available: availableVersion,
      global: globalVersion,
      local: localVersion,
    };
  }

  async getAvailableVersion(): Promise<Semver> {
    const versionString = await execBashCodeAsync(
      `npm view ${this.packageName} version`,
    );

    return Semver.fromVersionString(versionString);
  }

  async getGlobalVersion(): Promise<Semver | null> {
    return this.getInstalledVersion(true);
  }

  async getLocalVersion(): Promise<Semver | null> {
    return this.getInstalledVersion();
  }

  private async getInstalledVersion(global = false, deps = 0): Promise<Semver | null> {
    try {
      const versionList = await execBashCodeAsync(
        `npm ls ${global ? '-g' : ''} --deps=${deps} ${this.packageName} version`,
      );

      return Semver.fromVersionList(versionList);
    } catch (error) {
      return null;
    }
  }
}

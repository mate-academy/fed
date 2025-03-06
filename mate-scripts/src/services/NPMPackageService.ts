import { execBashCodeAsync, Semver } from '../tools';

export interface PackageVersions {
  available: Semver;
  global: Semver | null;
  local: Semver | null;
}

export interface Environments {
  local?: boolean;
  global?: boolean;
}

export interface UpdateOptions {
  envs?: Environments;
  silent?: boolean;
}

export interface InstallOptions {
  isGlobal?: boolean;
  versionString?: string;
  silent?: boolean;
}

const defaultEnvironments: Environments = {
  local: true,
  global: false,
};

const defaultUpdateOptions: UpdateOptions = {
  envs: defaultEnvironments,
  silent: false,
};

const defaultInstallOptions: InstallOptions = {
  isGlobal: false,
  versionString: '',
  silent: false,
};

export class NPMPackageService {
  private privateVersions: PackageVersions | undefined;

  constructor(private packageName: string) {}

  async ensure(
    {
      envs = defaultUpdateOptions.envs as Environments,
      silent = defaultUpdateOptions.silent as boolean,
    }: UpdateOptions = defaultUpdateOptions,
  ) {
    const versions = await this.getVersions();

    if (envs.local && !versions.local) {
      await this.install({ silent });
    }

    if (envs.global && !versions.global) {
      await this.install({ silent, isGlobal: true });
    }
  }

  async update(
    {
      envs = defaultUpdateOptions.envs as Environments,
      silent = defaultUpdateOptions.silent as boolean,
    }: UpdateOptions = defaultUpdateOptions,
  ) {
    const versions = await this.getVersions();

    if (envs.local && versions.available.isHigher(versions.local)) {
      await this.install({ silent });
    }

    if (envs.global && versions.available.isHigher(versions.global)) {
      await this.install({ silent, isGlobal: true });
    }
  }

  async install(
    {
      isGlobal = defaultInstallOptions.isGlobal as boolean,
      versionString = defaultInstallOptions.versionString as string,
      silent = defaultInstallOptions.silent as boolean,
    }: InstallOptions = defaultInstallOptions,
  ) {
    let versionToInstall = versionString;

    if (!versionToInstall) {
      const versions = await this.getVersions();

      versionToInstall = versions.available.versionString;
    }

    if (!silent) {
      const versions = await this.getVersions();
      const targetVersion = versions[isGlobal
        ? 'global'
        : 'local'];

      console.log(
        `Update ${isGlobal
          ? 'global'
          : 'local'} ${this.packageName} from ${targetVersion?.versionString || '"none"'} to ${versions.available.versionString}`,
      );
    }

    await execBashCodeAsync(
      `npm i ${isGlobal
        ? '-g'
        : ''} ${this.packageName}@${versionToInstall}`,
      {
        shouldBindStdout: false,
      },
    );
  }

  async getVersions(): Promise<PackageVersions> {
    if (!this.privateVersions) {
      await this.setVersions();
    }

    return this.privateVersions as PackageVersions;
  }

  async setVersions() {
    const [
      availableVersion,
      globalVersion,
      localVersion,
    ] = await Promise.all([
      this.getAvailableVersion(),
      this.getGlobalVersion(),
      this.getLocalVersion(),
    ]);

    this.privateVersions = {
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

  getGlobalVersion(): Promise<Semver | null> {
    return this.getInstalledVersion(true);
  }

  getLocalVersion(): Promise<Semver | null> {
    return this.getInstalledVersion();
  }

  private async getInstalledVersion(
    global = false,
    deps = 0,
  ): Promise<Semver | null> {
    try {
      const versionList = await execBashCodeAsync(
        `npm ls ${global
          ? '-g'
          : ''} --deps=${deps} ${this.packageName} version`,
      );

      return Semver.fromVersionList(versionList);
    } catch (error) {
      return null;
    }
  }
}

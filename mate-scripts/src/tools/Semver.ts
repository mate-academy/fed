import { last } from './array';

export class Semver {
  major: number;

  minor: number;

  patch: number;

  private constructor(public versionString: string) {
    this.validate();

    const [major, minor, patch] = this.getParts();

    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  static fromVersionString(versionString: string): Semver {
    return new Semver(versionString);
  }

  static fromVersionList(versionList: string): Semver {
    const versionString = this.getVersionStringFromVersionList(versionList);

    return new Semver(versionString);
  }

  isHigher(version: Semver | null): boolean {
    if (!version) {
      return true;
    }

    if (this.major > version.major) {
      return true;
    }

    if (this.major < version.major) {
      return false;
    }

    if (this.minor > version.minor) {
      return true;
    }

    if (this.minor < version.minor) {
      return false;
    }

    if (this.patch > version.patch) {
      return true;
    }

    if (this.patch < version.patch) {
      return false;
    }

    return false;
  }

  private static getVersionStringFromVersionList(versionList: string): string {
    return last(versionList.split('@'));
  }

  private validate(): never | void {
    const parts = this.versionString.split('.');

    if (parts.length !== 3) {
      Semver.throwSemverError();
    }

    const areNumbers = parts.every((num) => !Number.isNaN(Number(num)));

    if (!areNumbers) {
      Semver.throwSemverError();
    }
  }

  private getParts(): [number, number, number] {
    return this.versionString
      .split('.')
      .map(Number) as [number, number, number];
  }

  private static throwSemverError(): never {
    throw new Error('Semver should contain 3 numbers divided with point(.)');
  }
}

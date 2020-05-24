import fs from 'fs-extra';
import path from 'path';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { repositories } from '../repositories';
import { ProjectTypes } from '../../constants';
import { execBashCodeAsync } from '../../tools';

dotenv.config();

const githubToken = process.env.GITHUB_TOKEN;
const orgName = 'mate-academy';
const baseBranch = 'master';
const prBranch = 'mate-scripts-update';
const mergeMethod = 'squash';
const tmpDir = '/tmp';

export interface UpdateReposOptions {
  commands: string[],
  message: string,
  projectTypes: string[],
  includedProjects: string[],
  excludedProjects: string[],
  shouldMerge: boolean,
  isSilent: boolean,
}

export class ReposUpdater {
  private readonly octokit: Octokit;

  constructor(private readonly options: UpdateReposOptions) {
    this.octokit = new Octokit({
      auth: githubToken
    });
  }

   updateRepos = async () => {
    const reposToUpdate = this.getReposToUpdate();
    const prUrlsPromises = reposToUpdate.map(this.tryToUpdateRepo);

    const prUrls = await Promise.all(prUrlsPromises);

    console.log(prUrls);
  };

  private getReposToUpdate() {
    const {
      projectTypes,
      includedProjects,
      excludedProjects,
    } = this.options;

    return (Object.keys(repositories) as ProjectTypes[])
      .filter((projectType: ProjectTypes) => projectTypes.includes(projectType))
      .flatMap((projectType) => repositories[projectType])
      .filter((repoName) => includedProjects.length ? includedProjects.includes(repoName) : true)
      .filter((repoName) => !excludedProjects.includes(repoName));
  }

  private tryToUpdateRepo = async (repo: string) => {
    try {
      return this.updateRepo(repo);
    } catch (error) {
      return ReposUpdater.catchUpdateRepoError(repo, error);
    } finally {
      await ReposUpdater.cleanUpAfterUpdateRepo(repo);
    }
  };

  private execInDir = (cwd: string) => (command: string) => execBashCodeAsync(command, {
    shouldBindStdout: !this.options.isSilent, cwd,
  });

private async updateRepo(repo: string) {
    const {
      commands,
      message,
      shouldMerge,
    } = this.options;
    const repoSSHUrl = `git@github.com:${orgName}/${repo}.git`;
    const repoDir = path.join(tmpDir, repo);

    const execInTmp = this.execInDir(tmpDir);
    const execInRepo = this.execInDir(repoDir);

    await execInTmp(`git clone ${repoSSHUrl} ${repoDir}`);
    await execInRepo(`git checkout -b ${prBranch}`);

    for (let command of commands) {
      await execInRepo(command);
    }

    await execInRepo('git add -A');
    await execInRepo(`git commit -m "${message}"`);
    await execInRepo(`git push -f origin ${prBranch}:${prBranch}`);

    console.log({
      owner: orgName,
      repo,
      title: message,
      head: prBranch,
      base: baseBranch,
    });
    const { data: { html_url: url, number: pullNumber } } = await this.octokit.pulls.create({
      owner: orgName,
      repo,
      title: message,
      head: prBranch,
      base: baseBranch,
    });

    if (shouldMerge) {
      await this.octokit.pulls.merge({
        owner: orgName,
        repo,
        pull_number: pullNumber,
        mergeMethod,
      });

      await execInRepo(`git push --delete origin ${prBranch}`);
    }

    console.log('Done with ', repo);

    return { [repo]: url };
  }

  private static catchUpdateRepoError(repo: string, error: Error) {
    console.log('Repo error: ', error);

    return { [repo]: false };
  }

  private static async cleanUpAfterUpdateRepo(repo: string) {
    const repoDir = path.join(tmpDir, repo);

    try {
      await fs.remove(repoDir);
    } catch (error) {
      // NODTE: do nothing, failing here means updateRepo fails before create folder(before clone repo)
    }
  }
}

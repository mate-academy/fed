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
  commands: string[];
  message: string;
  projectTypes: string[];
  includedProjects: string[];
  excludedProjects: string[];
  shouldMerge: boolean;
  isSilent: boolean;
  chunkSize: number;
  mergeOnly: boolean;
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
    const reposChunks = reposToUpdate.reduce((chunks, repo, index) => {
      if ((index % this.options.chunkSize) === 0) {
        chunks.push([]);
      }

      chunks[chunks.length - 1].push(repo);

      return chunks;
    }, [] as string[][]);
    const prUrls: { [key: string]: any }[] = [];

    const updater = this.options.mergeOnly
      ? this.mergePR
      : this.tryToUpdateRepo;

    for (let i = 0; i < reposChunks.length; i++) {
      const chunk = reposChunks[i];

      console.log(`Processing chunk ${i}
Repos:
${chunk.join('\n')}`);

      const prUrlsPromises = chunk.map(updater);
      const chunkPrUrls = await Promise.all(prUrlsPromises);

      console.log(`Done with chunk ${i}`);

      prUrls.push(...chunkPrUrls);
    }

    console.log(prUrls);

    await fs.writeFile(
      path.join(__dirname, '../', 'lastCreatedPRs.json'),
      JSON.stringify(prUrls, null, 2),
    );
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

  private tryToUpdateRepo = async (repo: string): Promise<any> => {
    try {
      return await this.updateRepo(repo);
    } catch (error) {
      return await ReposUpdater.catchUpdateRepoError(repo, error);
    } finally {
      await ReposUpdater.cleanUpAfterUpdateRepo(repo);
    }
  };

  private mergePR = async (repo: string): Promise<any> => {
    let pullRequests;

    try {
      const { data } = await this.octokit.pulls.list({
        owner: orgName,
        repo,
        base: baseBranch,
        head: `${orgName}:${prBranch}`,
        sort: 'updated',
        direction: 'desc',
      });

      pullRequests = data;
    } catch (error) {
      return {
        [repo]: false,
        message: 'PR does not exists',
      };
    }

    const pr = pullRequests[0];

    try {
      await this.octokit.pulls.checkIfMerged({
        owner: orgName,
        repo,
        pull_number: pr.number,
      });
    } catch (error) {
      try {
        await this.octokit.pulls.merge({
          owner: orgName,
          repo,
          pull_number: pr.number,
          mergeMethod,
        });

        return {
          [repo]: pr.html_url,
        };
      } catch (error) {
        return {
          [repo]: false,
          message: 'Cannot merge PR',
        };
      }
    }

    return {
      [repo]: false,
      message: 'PR  already merged',
    };
  };

  private execInDir = (cwd: string) => (command: string) => execBashCodeAsync(command, {
    shouldBindStdout: !this.options.isSilent, cwd,
  });

  private async updateRepo(repo: string) {
    console.log('Start working with repo: ', repo);

    const {
      commands,
      message,
      shouldMerge,
    } = this.options;
    const repoSSHUrl = `git@github.com:${orgName}/${repo}.git`;
    const repoDir = path.join(tmpDir, repo);

    const execInTmp = this.execInDir(tmpDir);
    const execInRepo = this.execInDir(repoDir);

    try {
      console.log('Clean up repo folder: ', repoDir);

      await execInTmp(`rm -rf ${repoDir}`)
    } catch (error) {
      // do nothing
    }

    console.log('Clone: ', repoSSHUrl);

    await execInTmp(`git clone ${repoSSHUrl} ${repoDir}`);
    await execInRepo(`git checkout -b ${prBranch}`);

    for (let command of commands) {
      console.log(`Execute command ${command} in repo ${repo}`);

      await execInRepo(command);
    }

    await execInRepo('git add -A');
    await execInRepo(`git commit -m "${message}"`);
    await execInRepo(`git push -f --no-verify origin ${prBranch}:${prBranch}`);

    let pr;

    try {
      const { data } = await this.octokit.pulls.create({
        owner: orgName,
        repo,
        title: message,
        head: prBranch,
        base: baseBranch,
      });

      pr = data;
    } catch (error) {
      console.log(`Repo: ${repo}`, error.errors[0].message);
      console.log('Will try to merge existing PR', repo);

      const { data } = await this.octokit.pulls.list({
        owner: orgName,
        repo,
        base: baseBranch,
        head: `${orgName}:${prBranch}`,
        sort: 'updated',
        direction: 'desc',
      });

      pr = data[0];

      if (pr.head.ref !== prBranch) {
        throw error;
      }
    }

    if (shouldMerge) {
      try {
        await this.octokit.pulls.merge({
          owner: orgName,
          repo,
          pull_number: pr.number,
          mergeMethod,
        });
      } catch (error) {
        console.log(`Fail to merge pr
${pr.url}
in repo ${repo}`);

        throw error;
      }

      try {
        await execInRepo(`git push --delete origin ${prBranch}`);
      } catch (error) {
        console.log(`Cannot remove branch ${prBranch} in repo ${repo}`);
      }
    }

    console.log('Done with ', repo);

    return { [repo]: pr.html_url };
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
      // NOTE: do nothing, failing here means updateRepo fails before create folder(before clone repo)
    }
  }
}

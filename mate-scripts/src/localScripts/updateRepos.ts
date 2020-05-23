import fs from 'fs-extra';
import path from 'path';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { Command } from 'commander';
import { repositories } from './repositories.js';
import pkg from '../../package.json';
import { ProjectTypes } from '../constants.js';
import { execBashCodeAsync, ExecBashCodeAsyncParams } from '../tools';

dotenv.config();

function commaSeparatedList(value: string) {
  return value.split(',');
}

const githubToken = process.env.GITHUB_TOKEN;
const orgName = 'mate-academy';
const baseBranch = 'master';
const prBranch = 'mate-scripts-update';
const defaultMessage = `update ${pkg.version}`;
const mergeMethod = 'squash';

const program = new Command();

program
  .option('-c, --commands <items>', 'Bash command to run inside repo folder', commaSeparatedList, ['mate-scripts update'])
  .option('-m, --message <string>', 'Commit message and PR title', defaultMessage)
  .option('-t, --types, <items>', 'Project types to update', commaSeparatedList, ['layout'])
  .option('-i, --include, <items>', 'Specific projects to update', commaSeparatedList, [])
  .option('-e, --exclude, <items>', 'Specific projects to exclude from update', commaSeparatedList, [])
  .option('--merge', 'Merge pull requests automatically', false)
  .option('-s, --silent', 'Hide internal commands logs', false);

program.parse(process.argv);

const {
  commands,
  message,
  types: projectTypes,
  include: includedProjects,
  exclude: excludedProjects,
  merge:  shouldMerge,
  silent: isSilent,
} = program.opts();

async function updateRepos() {
  const reposTempDir = path.join('/', 'tmp');
  const octokit = new Octokit({
    auth: githubToken
  });
  const execOptions: ExecBashCodeAsyncParams = {
    shouldBindStdout: !isSilent,
  };

  const execInDir = (cwd: string) => (command: string) => execBashCodeAsync(command, {
    ...execOptions, cwd,
  });
  const execInTmp = execInDir(reposTempDir);
  const reposToUpdate = (Object.keys(repositories) as ProjectTypes[])
    .filter((projectType: ProjectTypes) => projectTypes.includes(projectType))
    .flatMap((projectType) => repositories[projectType])
    .filter((repoName) => includedProjects.length ? includedProjects.includes(repoName) : true)
    .filter((repoName) => !excludedProjects.includes(repoName));

  const prUrlsPromises = reposToUpdate.map(async (repo) => {
    const repoSSHUrl = `git@github.com:${orgName}/${repo}.git`;
    const repoDir = path.join(reposTempDir, repo);

    const execInRepo = execInDir(repoDir);

    try {
      await execInTmp(`git clone ${repoSSHUrl} ${repoDir}`);

      await execInRepo(`git checkout -b ${prBranch}`);

      for (let command of commands) {
        await execInRepo(command);
      }

      await execInRepo('git add -A');
      await execInRepo(`git commit -m "${message}"`);
      await execInRepo(`git push origin ${prBranch}:${prBranch}`);

      const { data: { html_url: url, number: pullNumber } } = await octokit.pulls.create({
        owner: orgName,
        repo,
        title: message,
        head: prBranch,
        base: baseBranch,
      });

      if (shouldMerge) {
        await octokit.pulls.merge({
          owner: orgName,
          repo,
          pull_number: pullNumber,
          mergeMethod,
        });

        await execInRepo(`git push --delete origin ${prBranch}`);
      }

      console.log('Done with', repo);

      return url;
    } catch (error) {
      console.log('Repo error: ', error);
    } finally {
      try {
        await fs.remove(repoDir);
      } catch (e) {
        // do nothing
      }
    }

    return false;
  });

  const prUrls = await Promise.all(prUrlsPromises);

  console.log({ prUrls });
}

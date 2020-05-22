import fs from 'fs-extra';
import path from 'path';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { Command } from 'commander';
import { repositories } from './repositories';
import pkg from './package.json';
import { ProjectTypes } from './src/constants.js';
import { execBashCodeAsync, ExecBashCodeAsyncParams } from './src/tools';

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
  .option('-i, --instructions <items>', 'Bash command to run inside repo folder', commaSeparatedList, ['mate-scripts update'])
  .option('-m, --message <string>', 'Commit message and PR title', defaultMessage)
  .option('-s, --silent', 'Hide internal commands logs', false)
  .option('--merge', 'Merge pull requests automatically', false)
  .option('-t, --types, <items>', 'Project types to update', commaSeparatedList, ['layout'])
  .option('-r, --repos, <items>', 'Specific repos to update', commaSeparatedList, [])
  .option('-e, --exclude, <items>', 'Repos to exclude from update', commaSeparatedList, []);

program.parse(process.argv);

async function updateRepos() {
  const reposTempDir = path.join('/', 'tmp');
  const octokit = new Octokit({
    auth: githubToken
  });
  const execOptions: ExecBashCodeAsyncParams = {
    shouldBindStdout: !program.silent,
  };

  const execInDir = (cwd: string) => (command: string) => execBashCodeAsync(command, {
    ...execOptions, cwd,
  });
  const execInTmp = execInDir(reposTempDir);
  const reposToUpdate = (Object.keys(repositories) as ProjectTypes[])
    .filter((projectType: ProjectTypes) => program.types.includes(projectType))
    .flatMap((projectType) => repositories[projectType])
    .filter((repoName) => program.repos.length ? program.repos.includes(repoName) : true)
    .filter((repoName) => !program.exclude.includes(repoName));

  const prUrlsPromises = reposToUpdate.map(async (repo) => {
    const repoSSHUrl = `git@github.com:${orgName}/${repo}.git`;
    const repoDir = path.join(reposTempDir, repo);

    const execInRepo = execInDir(repoDir);

    try {
      await execInTmp(`git clone ${repoSSHUrl} ${repoDir}`);

      await execInRepo(`git checkout -b ${prBranch}`);

      for (let instruction of program.instructions) {
        await execInRepo(instruction);
      }

      await execInRepo('git add -A');
      await execInRepo(`git commit -m "${program.message}"`);
      await execInRepo(`git push origin ${prBranch}:${prBranch}`);

      const { data: { html_url: url, number: pullNumber } } = await octokit.pulls.create({
        owner: orgName,
        repo,
        title: program.message,
        head: prBranch,
        base: baseBranch,
      });

      if (program.merge) {
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

updateRepos();

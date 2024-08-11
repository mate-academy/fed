import path from 'path';
// import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';
import { config } from 'dotenv';
import repos from './repoNamesFromDb.json';

config();

// const githubToken = process.env.GITHUB_TOKEN;
// const orgName = 'mate-academy';

export async function getRepos() {
  // const octokit = new Octokit({
  //   auth: githubToken
  // });
  //
  // const repos = await octokit.paginate(octokit.repos.listForOrg as any, {
  //   org: orgName,
  // });

  const none = [];
  const layout = [];
  const layoutDOM = [];
  const javascript = [];
  const typescript = [];
  const react = [];
  const vue = [];

  for (const name of repos) {
    if (name.startsWith('layout_')) {
      layout.push(name);
    } else if (name.startsWith('js_') && name.endsWith('DOM')) {
      layoutDOM.push(name);
    } else if (name.startsWith('js_')) {
      javascript.push(name);
    } else if (name.startsWith('ts_')) {
      typescript.push(name);
    } else if (name.startsWith('react_') || name.startsWith('redux_')) {
      react.push(name);
    } else if (name.startsWith('vue_')) {
      vue.push(name);
    } else {
      none.push(name);
    }
  }

  await fs.writeFile(path.join(__dirname, './repositories-raw.json'), JSON.stringify({
    none,
    layout,
    layoutDOM,
    javascript,
    react,
    vue,
  }, null, 2));
}

getRepos();

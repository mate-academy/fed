import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';

const githubToken = process.env.GITHUB_TOKEN;
const orgName = 'mate-academy';

export async function getRepos() {
  const octokit = new Octokit({
    auth: githubToken
  });

  const repos = await octokit.paginate(octokit.repos.listForOrg, {
    org: orgName,
  });

  const none = [];
  const layout = [];
  const javascript = [];
  const react = [];

  for (const { name } of repos) {
    if (name.startsWith('layout_') || name.includes('DOM')) {
      layout.push(name);
    } else if (name.startsWith('js_')) {
      javascript.push(name);
    } else if (name.startsWith('react_') || name.startsWith('redux_')) {
      react.push(name);
    } else {
      none.push(name);
    }
  }

  await fs.writeFile('./repositories-raw.json', JSON.stringify({
    none,
    layout,
    javascript,
    react,
  }, null, 2));
}

getRepos();

import { update } from "./tracker";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

async function find(project: string, version?: string) {
  const data = JSON.parse(process.env.DATA || "[]");
  let owner;

  for (const user of data) {
    try {
      const repo = await octokit.repos.get({
        owner: user,
        repo: project,
      });

      if (repo) {
        owner = user;
      }
    } catch (e) {}
  }

  if (owner == null) return null;

  let release;
  try {
    if (version) {
      release = await octokit.repos.getReleaseByTag({
        owner: owner,
        repo: project,
        tag: version,
      });
    } else {
      release = await octokit.repos.getLatestRelease({
        owner: owner,
        repo: project,
      });
    }
  } catch (e) {
    return null;
  }

  if (!release) return null;
  if (release.data.assets.length === 0) return null;

  version = release.data.tag_name;
  update(project, version);
  return release.data.assets[0];
}

export default find;

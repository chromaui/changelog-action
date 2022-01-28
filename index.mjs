import { getInput, setFailed, setOutput } from '@actions/core';
import { readFile, writeFile, writeFileSync } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

main().catch((error) => setFailed(error.message));

async function main() {
  const CHANGELOG_PATH = './CHANGELOG.md';
  try {
    const pullRequest = getInput('pull_request');
    console.log('------------');
    console.log(pullRequest);
    console.log(pullRequest.merged_at);
    console.log(typeof pullRequest);
    console.log(Object.keys(pullRequest));

    const logLine = `**${pullRequest.merged_at}:** [${pullRequest.title}](${pullRequest.html_url})`;
    console.log(logLine);

    const contents = await readFileAsync(CHANGELOG_PATH);

    await writeFileSync(CHANGELOG_PATH, `${logLine}\n${contents}`);
    console.log('done');
  } catch (error) {
    setFailed(error.message);
  }
}

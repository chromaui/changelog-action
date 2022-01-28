import { getInput, setFailed, setOutput } from '@actions/core';
import { readFile, writeFile, writeFileSync } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

main().catch((error) => setFailed(error.message));

const CHANGELOG_PATH = './CHANGELOG.md';

async function main() {
  try {
    const pullRequest = getInput('pullRequest');
    console.log(pullRequest);

    const logLine = `**${pullRequest.merged_at}:** [${pullRequest.title}](${pullRequest.html_url})`;
    console.log(logLine);

    const contents = await readFileAsync(CHANGELOG_PATH);

    await writeFileSync(CHANGELOG_PATH, `${logLine}\n${contents}`);
    console.log('done');
  } catch (error) {
    setFailed(error.message);
  }
}

import { getInput, setFailed } from '@actions/core';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

main().catch((error) => setFailed(error.message));

async function main() {
  const CHANGELOG_PATH = './CHANGELOG.md';
  try {
    const { merged_at, title, html_url } = JSON.parse(getInput('pull_request'));

    const logLine = `**${merged_at}:** [${title}](${html_url})`;
    console.log(logLine);

    const contents = await readFileAsync(CHANGELOG_PATH);

    await writeFileAsync(CHANGELOG_PATH, `${logLine}\n${contents}`);
    console.log('done');
  } catch (error) {
    setFailed(error.message);
  }
}

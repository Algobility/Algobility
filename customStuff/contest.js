import { m } from 'framer-motion';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export function getContestInfo() {
  //returns contest info of latest contest in /contest
  const contestDirectory = path.join(process.cwd(), 'contest');
  const infoJson = fs.readFileSync(contestDirectory + '/info.json', 'utf8');
  const contestJson = fs.readFileSync(contestDirectory + `/${JSON.parse(infoJson).latest}.json`, 'utf8');
  return contestJson;
}

export function getAllContests() {
  const contestDirectory = path.join(process.cwd(), 'contest');
  const fileNames = fs.readdirSync(contestDirectory, 'utf8');
  const returnArray = [];
  for (let fileName of fileNames) {
    if (fileName != 'info.json') {
      const file = fs.readFileSync(path.join(contestDirectory, fileName), 'utf8');
      const fileJSON = JSON.parse(file);
      if (new Date(fileJSON.endTime) > new Date()) {
        returnArray.push(fileJSON);
      }
    }
  }
  return returnArray;
}

export async function getContestProbData(rank, id) {
  const contestDirectory = path.join(process.cwd(), `contest_problems/${rank}`);
  const fullPath = path.join(contestDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml and return
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

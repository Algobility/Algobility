import { m } from 'framer-motion';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// export function getLatestContest() {
//   //returns contest info of latest contest in /contest
//   const contestDirectory = path.join(process.cwd(), 'contest');
//   const infoJson = fs.readFileSync(contestDirectory + '/info.json', 'utf8');
//   const contestJson = fs.readFileSync(contestDirectory + `/${JSON.parse(infoJson).latest}.json`, 'utf8');
//   return contestJson;
// }

export function getUpcomingContests() {
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
  // returnArray.sort((a,b)=>a.startTime - b.startTime)
  //sorting now happens client-side
  return returnArray;
}

export async function getContestProbData(rank, id) {
  const contestDirectory = path.join(process.cwd(), `contest_problems/${rank}`);
  const fullPath = path.join(contestDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = await matter(fileContents);

  return {
    id,
    rank,
    contentHtml: matterResult.content,
    ...matterResult.data,
  };
}

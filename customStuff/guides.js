import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { codedRanks } from './nameMapping';

const postsDirectory = path.join(process.cwd(), 'guides');

export async function getGuideData(rank, chap) {
  const fullPath = path.join(postsDirectory, `${rank}/${chap}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = await matter(fileContents);
  return { id: chap, rank, matterResult };

  // Combine the data with the id and contentHtml
  // return {
  //   contentHtml,
  //   ...matterResult.data
  // }

  // const filePath = `./guides/${params.rank}/${params.chap}.mdx`;
  // const source = fs.readFileSync(filePath);

  // const { content, data } = matter(source);
}

export async function getGuides(rank) {
  const fileNames = fs.readdirSync(path.join(postsDirectory, `${rank}/`));
  let counter = 0;
  const filteredPostsData = fileNames.reduce((filteredData, fileName) => {
    if (counter >= 50) {
      return filteredData;
    }

    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const postData = {
      id,
      ...matterResult.data,
    };

    filteredData.push(postData);
    counter++;

    return filteredData;
  }, []);

  // Sort the filtered posts by date
  // const sortedPostsData = filteredPostsData.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // })

  return filteredPostsData;
}

/**
 * Retrieves all guides categorized by rank.
 *
 * This function iterates through all coded ranks and reads the guide files for each rank
 * from the file system. It parses the metadata of each guide using gray-matter and sorts
 * the guides by their id. The result is an object where each key is a rank name and each
 * value is an array of guides belonging to that rank.
 *
 * @returns {Promise<Object>} An object containing arrays of guide data, categorized by rank.
 */

export async function getAllGuides() {
  const result = {};
  await codedRanks.forEach((rankName) => {
    const rankPath = path.join(postsDirectory, `${rankName}/`);
    if (fs.existsSync(rankPath)) {
      const fileNames = fs.readdirSync(rankPath);
      let filteredPostsData = fileNames.reduce((filteredData, fileName) => {
        const id = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(rankPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const postData = {
          id,
          ...matterResult.data,
        };

        filteredData.push(postData);

        return filteredData;
      }, []);

      filteredPostsData.sort((a, b) => {
        return parseInt(a.id) < parseInt(b.id) ? -1 : 1;
      });
      result[rankName] = filteredPostsData;
    }
  });

  return result;
}

export async function getSpecialGuideData() {
  const fullPath = path.join(path.join(process.cwd(), 'special_guides'), `IntroToCompetitiveProgramming.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = await matter(fileContents);
  return { matterResult };
}


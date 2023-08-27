import fs, { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import spoilers from 'remark-spoilers';
import html from 'remark-html';
import { ranks } from './nameMapping';

const postsDirectory = path.join(process.cwd(), 'problems');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get array of object representing each problem that satisfies an inputted query
 */
export function getFilteredPostData(rank, rawTopic) {
  //Create var topics which stores an array of all topics to search (may have one or all topics of a rank)
  let topics = [];
  if (rawTopic == 'anytopic') {
    const fullPath = path.join(postsDirectory, `${rank}`);
    if (!fs.existsSync(fullPath)) {
      return [];
    }
    const topicNames = fs.readdirSync(fullPath);
    topics = topicNames;
  } else {
    topics = [rawTopic];
  }

  let result = []; //result to be returned

  for (let topic of topics) {
    const fullPath = path.join(postsDirectory, `${rank}/${topic}`);

    if (!fs.existsSync(fullPath)) {
      continue;
    }

    const fileNames = fs.readdirSync(fullPath);

    const filteredPostsData = fileNames.reduce((filteredData, fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, `${rank}/${topic}/${id}.mdx`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const postData = {
        id,
        rank,
        topic,
        ...matterResult.data,
      };

      // Check if the problem matches the given rank and credit
      if (!postData.invisible) {
        filteredData.push(postData);
      }

      return filteredData;
    }, []);

    result = [...result, ...filteredPostsData];
  }

  return result;
}

function getAllFilesRecursive(directoryPath, filesArray) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getAllFilesRecursive(filePath, filesArray);
    } else if (stats.isFile()) {
      filesArray.push(filePath);
    }
  });

  return filesArray;
}

function getExtendedPath(fullPath, subPath) {
  const normalizedFullPath = path.normalize(fullPath);
  const normalizedSubPath = path.normalize(subPath);

  if (!normalizedFullPath.startsWith(normalizedSubPath)) {
    throw new Error("The full path doesn't extend from the subpath.");
  }

  const extendedPath = normalizedFullPath.slice(normalizedSubPath.length).replace(/^[/\\]/, '');

  return extendedPath;
}

export function getAllPostIds() {
  const allFiles = getAllFilesRecursive(postsDirectory, []);
  const result = [];
  for (let file of allFiles) {
    const id = getExtendedPath(file, postsDirectory)
      .replace(/\.mdx$/, '')
      .split('\\');
    result.push({
      params: {
        slug: id,
      },
    });
  }
  return allFiles;
}

// export async function getPostData(id, xray=false) {
//   const fullPath = path.join(postsDirectory, `${id}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   //If a question is hidden and the caller does not have xray powers, don't return the question content
//   if(matterResult.data.invisible && !xray){
//     return 'hidden'
//   }

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content)

//   const contentHtml = processedContent.toString()

//   // Combine the data with the id and contentHtml and return
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data
//   }
// }

export async function getPostData(rank, topic, id) {
  const fullPath = path.join(postsDirectory, `${rank}/${topic}/${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = await matter(fileContents);
  return { id, rank, topic, contentHtml: matterResult.content, ...matterResult.data };
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import html from 'remark-html'
import { remark } from 'remark'

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'guides')


export async function getGuideData(rank, chap) {
    const fullPath = path.join(postsDirectory, `${rank}/${chap}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // Use remark to convert markdown into HTML string

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

    // const processedContent =  await unified()
    // .use(remarkParse) // Convert into markdown AST
    // .use(remarkRehype) // Transform to HTML AST
    // .use(rehypeSanitize) // Sanitize HTML input
    // .use(rehypeStringify) // Convert AST into serialized HTML
    // .process(matterResult.content);

    const contentHtml = processedContent.toString()
  
    // Combine the data with the id and contentHtml
    return {
      contentHtml,
      ...matterResult.data
    }
  }
  
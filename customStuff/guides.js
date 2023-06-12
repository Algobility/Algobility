import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { codedRanks } from './nameMapping'

const postsDirectory = path.join(process.cwd(), 'guides')


export async function getGuideData(rank, chap) {

    const fullPath = path.join(postsDirectory, `${rank}/${chap}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = await matter(fileContents)
    const id = fullPath.replace(/\.mdx$/, '')
    return  {id, rank, matterResult}

    
  
    // Combine the data with the id and contentHtml
    // return {
    //   contentHtml,
    //   ...matterResult.data
    // }

    // const filePath = `./guides/${params.rank}/${params.chap}.mdx`;
    // const source = fs.readFileSync(filePath);
  
    // const { content, data } = matter(source);
  }


  export async function getGuides(rank){
      const fileNames = fs.readdirSync(path.join(postsDirectory, `${rank}/`))
      let counter = 0
      const filteredPostsData = fileNames.reduce((filteredData, fileName) => {
        if (counter >= 50) {
          return filteredData
        }
          
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        const postData = {
          id,
          ...matterResult.data
        }
    
          filteredData.push(postData)
          counter++
    
        return filteredData
      }, [])
    
      // Sort the filtered posts by date
      // const sortedPostsData = filteredPostsData.sort((a, b) => {
      //   if (a.date < b.date) {
      //     return 1
      //   } else {
      //     return -1
      //   }
      // })
    
      return filteredPostsData
  }


  export async function getAllGuides(){
    const result = {}
    await codedRanks.forEach((rankName)=>{
      const rankPath = path.join(postsDirectory, `${rankName}/`)
      if(fs.existsSync(rankPath)){
        const fileNames = fs.readdirSync(rankPath)
        let filteredPostsData = fileNames.reduce((filteredData, fileName) => {
          const id = fileName.replace(/\.mdx$/, '')
          const fullPath = path.join(rankPath, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const matterResult = matter(fileContents)
          const postData = {
            id,
            ...matterResult.data
          }
      
            filteredData.push(postData)
      
          return filteredData
        }, [])
      
        filteredPostsData.sort( (a,b)=>{
          return a.number < b.number? -1:1
        })
        result[rankName] = filteredPostsData
      }
    })
    
      return result
  }
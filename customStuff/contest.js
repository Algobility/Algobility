import { m } from 'framer-motion';
import fs from 'fs'
import path from 'path'

export function getContestInfo(){   //returns contest info of latest contest in /contest
    const contestDirectory = path.join(process.cwd(), 'contest');
    const infoJson = fs.readFileSync(contestDirectory + '/info.json', 'utf8');
    const contestJson = fs.readFileSync(contestDirectory + `/${JSON.parse(infoJson).latest}.json`, 'utf8');
    return contestJson;
}

export function getAllContests(){
    const contestDirectory = path.join(process.cwd(), 'contest');
    const fileNames = fs.readdirSync(contestDirectory, 'utf8');
    const returnArray = []
    for(let fileName of fileNames){
        if(fileName!='info.json'){
            const file = fs.readFileSync(path.join(contestDirectory, fileName), 'utf8')
            const fileJSON = JSON.parse(file)
            if(new Date(fileJSON.endTime) > new Date()){
                returnArray.push(fileJSON)
            }
        }
    }
    return returnArray;
}
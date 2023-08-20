import { getAllPostIds, getPostData } from '../../customStuff/problems.js'
import Head from 'next/head'


/* ---------------------------------- Post ---------------------------------- */
import {
  Button,
  Icon,
  IconButton,
  NumberInputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Image from 'next/image';
import NicePage from '../../components/nicepage';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../customStuff/useDB';

export default function viewQ({postData}) {
  const router = useRouter();
  const { problem_id } = router.query;
  const { userData, updateUserData } = useUser();
  const [tcIndex, setTcIndex] = useState(1);
  const [marked, setMarked] = useState(false);

  // const [title, setTitle] = useState('Loading ...');
  // const [statement, setStatement] = useState(`Loading ...`);
  // const [credits, setCredits] = useState('Loading ...');
  // const [time, setTime] = useState(-1);
  // const [mem, setMem] = useState(-1);
  // const [rank, setRank] = useState('loading');
  // const [tcIn, setTcIn] = useState(Array.from({ length: 10 }, (_, index) => `loading ${index}`));
  // const [tcOut, setTcOut] = useState(Array.from({ length: 10 }, (_, index) => `loading ${index}`));

  if(postData === 'hidden'){
    return (
      <NicePage>
        <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='hidden md:block robo text-4xl px-8 text-center '>⚠️You should'nt be here⚠️</h1>
      <h1 className='md:hidden robo text-4xl px-8 text-center '>You should'nt be here</h1>
      <h2 className='robo text-lg mt-2 px-8 text-neutral-400 text-center'>This is a hidden problem. If you got here, chances are you mistyped the correct URL of the problem you were trying to access.</h2>
      <a className='mt-10 robo bg-primc rounded-md px-4 py-2' href='/practice'>Back to all questions</a>
        </div>
      </NicePage>
    )
  }

  return (
    <NicePage selected='practice' title='Practice'>
      <div className='flex justify-start  w-3/4'>
        <div className='h-full min-h-screen mt-24  pr-24 pl-14 py-10 w-full relative '>
          {/* <div className='relative flex justify-start items-center h-64  border-neutral-300 rounded-md p-4 w-auto '> */}
            {/* <img src={`/rank-icons/${postData.rank}.png`} alt='rank' className='w-auto h-full mr-8 '></img> */}
            <div className='border rounded-lg border-neutral-300 p-8 '>
              <h1 className='mont text-6xl mb-4 text-primc flex justify-start items-center'> {postData.title}</h1>
              <h2 className='mont '> Rank: <strong> {postData.rank.charAt(0).toUpperCase()}{postData.rank.slice(1)} </strong></h2>
              <h2 className='mont '> Time Constraint: <strong> {postData.time} second(s)</strong></h2>
              <h2 className='mont '>Memory Constraint: <strong> {postData.mem} mb</strong></h2>
              <h2 className='mont '>Credits:<strong> {postData.credits}</strong></h2>
            </div>
          {/* </div> */}
          <div className='robo  h-full mt-16 mr-24' id='ProblemMdWrapper' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} >
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                           MARK AS COMPLETE BUTTON                          */
          /* -------------------------------------------------------------------------- */}
          {/*
            <Button
            className={`w-full my-8 mx-4 robo ${marked ? 'bg-green-700' : 'bg-backL'}`}
            onClick={() => {
              const ifMarked = () => {
                let com = [...userData.completed];
                if (com != undefined) {
                  com.push(title);
                  return com;
                }
                return title;
              };

              const ifNotMarked = () => {
                let com = [...userData.completed];
                com.splice(userData.completed.indexOf(title), 1);
                return com;
              };

              const newMarked = !marked;
              updateUserData({
                completed: newMarked ? ifMarked : ifNotMarked,
              });
              setMarked(newMarked);
            }}
          >
            Mark as complete
          </Button> 
          
          */}
        </div>
      </div>
      <div className='h-5/6  flex flex-col justify-center items-center w-1/4 fixed top-32 right-8 z-10 '>
        <div className=' rounded-lg bg-backL h-full w-full relative'>
          {/* -------------------------------------------------------------------------- */
          /*                             Test cases menu bar                            */
          /* -------------------------------------------------------------------------- */}

          <div className='p-4 border-b h-18 items-center bg-neutral-700 rounded-t-md '>
            <p className='w-96 robo text-2xl  '>Test Cases</p>
          <h2 className=' robo '> Test your solution by running it on these test cases</h2>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                                 Test Cases                                 */
          /* -------------------------------------------------------------------------- */}
          <div className='text-left robo px-8 mt-8 '>
            <div className='flex justify-start items-center '>
              <h2 className='text-lg font-bold'>Test Input: </h2>
              <button
              className='ml-4 hover:bg-primc hover:border-primc transition-all px-4 py-2 border rounded-md'
                onClick={() => {
                  navigator.clipboard.writeText(postData.tcIn[tcIndex - 1]);
                }}
              >
                Copy to clipboard
              </button>
            </div>
            <h2 className='text-lg font-bold mt-2'>Expected Output: </h2>
            <div className='bg-neutral-800 border mono rounded-md p-4 mt-2'>{postData.tcOut[tcIndex - 1]}</div>
          </div>

          <div className='absolute flex justify-center items-center bottom-0 mt-auto w-full mb-4'>
            <Pagination
              count={postData.tcIn.length}
              variant='outlined'
              color='primary'
              onChange={(e, page) => setTcIndex(page)}
            />
          </div>
        </div>
      </div>
    </NicePage>
  );
}



/* ----------------------------------- Next js stuff ---------------------------------- */



  export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }
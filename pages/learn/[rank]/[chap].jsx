import { Menu } from '@mui/material';
import NicePage from '../../../components/nicepage';
import DropdownMenu from '../../../components/Menu';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Exercise from '../../../components/Exercise';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import MdxRenderer from '../../../components/MdxRenderer';
import { getAllGuides, getGuideData } from '../../../customStuff/guides';
import Link from 'next/link';

import { serialize } from 'next-mdx-remote/serialize';
import { pretty, ranks, unpretty } from '../../../customStuff/nameMapping';

export default function Learn({ content, frontMatter, chaps }) {
  const customify = (content) => {
    const substring = '!start ';
    var regex = new RegExp(substring + '[^!]+!', 'gi');
    return content.replace(regex, function (match) {
      let input = match.slice(8, -2);
      input = input.replace(/(?:\r\n|\r|\n)/g, '<br>').split('|NEXT|');
      return `<div data-component="CustomComponent" data-props='{"number": "${input[0]}", "question": "${input[1]}", "answer": "${input[2]}"}'></div>`;
    });
  };

  const [rank, setRank] = useState(frontMatter.rank);

  return (
    <NicePage selected='learn'>
      <div className='md:hidden w-screen h-screen flex justify-center items-center '>
        <div className='w-4/5 rounded-md bg-backL p-8'>
          <h1 className='robo text-center text-2xl mb-8 text-primc'>
            Please Use a larger screen size to view this page
          </h1>
          <p className='robo text-center'>
            We apologize for the inconvinence. <br className='mb-2' /> If you are viewing this, expect a mobile version
            to come out within a few days{' '}
          </p>
        </div>
      </div>

      {/* /* -------------------------------------------------------------------------- */
      /*                                   Content                                  */
      /* -------------------------------------------------------------------------- */}

      <div className=' min-h-screen hidden md:flex justify-end '>
        <div className=' w-4/5  overflow-auto px-32 pt-32 pb-12 '>
          <h1 className='mont text-6xl font-bold mb-2 text-primc flex justify-start items-center pt-12'>
            {frontMatter.title}
          </h1>
          <h2 className='mont border-b border-white  mb-2 pb-8  flex justify-start items-center'>
            {frontMatter.description}
          </h2>
          <div className=' h-16'></div>

          {/* <div
            className='mt-12'
            id='ProblemMdWrapper'
            dangerouslySetInnerHTML={{ __html: customify(guideData.contentHtml) + `<Exercise data='nice'></Exercise>` }}
          ></div> */}
          {/* <ParsedContentWrapper text={customify(guideData.contentHtml)}></ParsedContentWrapper> */}
          <MdxRenderer mdxSource={content} />
          <p className='text-center  mt-12 text-neutral-400 mont pt-24'>
            Credits: {frontMatter.credits} <br /> If you notice any issues with the above article, please send us
            feedback via discord{' '}
          </p>
        </div>
      </div>

      {/* /* -------------------------------------------------------------------------- */
      /*                                Chapters.exe                                */
      /* -------------------------------------------------------------------------- */}
      <div className='z-100 flex-col w-1/5  justify-center items-end top-0 left-0 h-screen fixed hidden md:flex '>
        <div className='rounded-none bg-backL  w-full h-full flex flex-col justify-start'>
          <Link
            href='/learn'
            className='hover:bg-neutral-700 cursor-pointer mt-12 px-6 robo text-lg flex justify-start gap-3 mb-12 border-t border-b py-4 border-neutral-500 items-center'
          >
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 24 24'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z'></path>
            </svg>
            Go Back
          </Link>
          <div className=' flex-1 py-6 pl-6  overflow-auto overflow-x-hidden w-full '>
            {/* Chapters Begin */}

            {chaps[unpretty(frontMatter.rank)].map((loopedChapter, index) => (
              <Link href={`/learn/${frontMatter.rank}/${loopedChapter.id}`}>
                <div
                  key={index}
                  className={`${
                    loopedChapter.title == frontMatter.title ? 'bg-primc border-primc !w-11/12' : ''
                  } border border-neutral-500 px-4 mb-4 py-2 rounded-md w-10/12 relative flex justify-start items-center hover:w-11/12 hover:bg-neutral-700 transition-all`}
                >
                  <span className='robo'>{loopedChapter.title}</span>
                  <span className='flex-1 text-right robo text-2xl pb-1'>{'>'}</span>
                </div>
              </Link>
            ))}

            {/* Chapters End */}
          </div>
        </div>
      </div>
    </NicePage>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 OLD METHOD                                 */
/* -------------------------------------------------------------------------- */

// export async function getStaticProps({ params }) {
//   const urlRank = params.rank;
//   const urlChap = params.chap;
//   const guideData = await getGuideData(urlRank, urlChap);
//   return { props: { guideData: guideData } };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }

/* -------------------------------------------------------------------------- */
/*                                 NEW METHOD                                 */
/* -------------------------------------------------------------------------- */

export async function getStaticProps({ params }) {
  const { id, rank, matterResult } = await getGuideData(params.rank, params.chap);
  const serializedContent = await serialize(matterResult.content);
  const chaps = await getAllGuides();

  const fm = {
    id: id,
    rank: rank,
    ...matterResult.data,
  };

  return {
    props: {
      content: serializedContent,
      frontMatter: fm,
      chaps: chaps,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

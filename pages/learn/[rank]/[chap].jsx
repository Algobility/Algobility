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
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

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

  return (
    <NicePage selected='learn' title='Guides'>
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
          <div className='flex justify-center items-center mt-24'>
            <Link
              href={`/learn/${frontMatter.rank}/${parseInt(frontMatter.id) - 1}`}
              onClick={(e) => {
                if (frontMatter.id == 1) e.preventDefault();
              }}
              className={`mx-auto bg-neutral-700  ${
                frontMatter.id == '1' ? 'text-neutral-500 ' : 'text-neutral-200 hover:bg-neutral-600'
              } w-48 text-center py-3 rounded-md robo`}
            >
              <ArrowBackIcon className='text-xl -translate-y-0.5 -translate-x-1' /> Previous Chapter{' '}
            </Link>
            <Link
              href={`/practice/${frontMatter.rank}/${frontMatter.title}`}
              onClick={(e) => {
                if (!frontMatter.practicable) e.preventDefault();
              }}
              className={`mx-auto  hover:lighten ${
                frontMatter.practicable ? 'text-neutral-200 bg-primc' : 'text-neutral-400 bg-neutral-700'
              } px-8 text-center py-3 rounded-md robo`}
            >
              {!frontMatter.practicable ? 'This chapter has no practice questions' : 'Practice Questions'}
            </Link>
            <Link
              href={`/learn/${frontMatter.rank}/${parseInt(frontMatter.id) + 1}`}
              onClick={(e) => {
                if (frontMatter.id == chaps[frontMatter.rank].length) e.preventDefault();
              }}
              className={`mx-auto bg-neutral-700  ${
                frontMatter.id == chaps[frontMatter.rank].length
                  ? 'text-neutral-500 '
                  : 'text-neutral-200 hover:bg-neutral-600'
              } w-48 text-center py-3 rounded-md robo`}
            >
              Next Chapter <ArrowForwardIcon className='text-xl -translate-y-0.5 translate-x-1' />
            </Link>
          </div>
          <p className='text-center mt-44 text-neutral-400 mont'>
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
          <h2 className='mt-12 robo mb-2 pl-8 text-3xl border-b pb-4'>Chapters</h2>
          <div className=' flex-1 py-6 px-8  overflow-auto customScroll overflow-x-hidden w-full '>
            {/* Chapters Begin */}
            {chaps[unpretty(frontMatter.rank)].map((loopedChapter, index) => (
              <div className='flex justify-start gap-2 items-stretch'>
                <div className='flex justify-center items-center flex-col pt-2'>
                  {loopedChapter.title == frontMatter.title ? (
                    <div className='bg-primc w-4 h-4 rounded-full'></div>
                  ) : (
                    <div className='bg-neutral-600 w-4 h-4 rounded-full'></div>
                  )}
                  <div
                    className={`${
                      index != chaps[unpretty(frontMatter.rank)].length - 1
                        ? 'border-neutral-500'
                        : 'border-transparent'
                    } border flex-1 `}
                  ></div>
                </div>
                <Link href={`/learn/${frontMatter.rank}/${loopedChapter.id}`} className='flex-1'>
                  <div
                    key={index}
                    className={` pl-2 pr-4 py-1  w-full relative rounded-md  hover:bg-neutral-700 transition-all text-base`}
                  >
                    <p className={`robo text-lg ${loopedChapter.title == frontMatter.title ? 'text-primc ' : ''}`}>
                      {loopedChapter.title}
                    </p>
                    <p className={`robo text-neutral-400 mb-6`}>{loopedChapter.description}</p>
                  </div>
                </Link>
              </div>
            ))}
            {/* Chapters End */}
          </div>
          <Link
            href={`/learn`}
            className='hover:bg-neutral-700 cursor-pointer mt-12 px-6 robo text-lg flex justify-start gap-3 mb-8 border-t border-b py-4 border-neutral-500 items-center'
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
            Back to all guides
          </Link>
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


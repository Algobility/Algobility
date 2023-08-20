import NicePage from '../components/nicepage';
import { useState } from 'react';
import MdxRenderer from '../components/MdxRenderer';
import { getSpecialGuideData } from '../customStuff/guides';
import Link from 'next/link';

import { ArrowBackIcon } from '@chakra-ui/icons';
import { serialize } from 'next-mdx-remote/serialize';
import { pretty, ranks, unpretty } from '../customStuff/nameMapping';

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

      <div className=' min-h-screen hidden md:flex '>
        <div className=' w-full  overflow-auto px-32 pt-32 pb-12 '>
          <Link href='/learn' className='robo hover:underline flex justify-start items-center gap-3 text-lg'>
            <ArrowBackIcon />
            Back to all guides
          </Link>
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
    </NicePage>
  );
}

export async function getStaticProps() {
  const { matterResult } = await getSpecialGuideData();
  const serializedContent = await serialize(matterResult.content);

  return {
    props: {
      content: serializedContent,
      frontMatter: matterResult.data,
    },
  };
}

import { useEffect, useState } from 'react';
import NicePage from '../../components/nicepage';
import { useUser } from '../../customStuff/useDB';
import useRank from '../../customStuff/useRank';
import DropdownMenu from '../../components/Menu';
import Link from 'next/link';
import { getAllGuides } from '../../customStuff/guides';
import { ranks, unpretty } from '../../customStuff/nameMapping';

export default function LearnIndex({ chaps }) {
  let { userData, signedState } = useUser();
  const [rank, setRank] = useState('loading');

  useEffect(() => {
    useRank(userData, signedState, (newRank) => {
      setRank(newRank);
    });
  }, [userData, signedState]);

  return (
    <NicePage selected='learn'>
      <div className='mt-32 min-h-screen--32 relative'>
        <p className='pt-10 mont text-6xl text-primc text-left w-3/4 mx-auto border-b-2 border-neutral-500 pb-4'>
          Training Guides
        </p>
        <div className='flex justify-center items-start w-full'>
          <div className='grid grid-cols-1 gap-4 w-3/4 mt-12 '>
            {rank != 'loading'
              ? chaps[unpretty(rank)].map((element, index) => (
                  <Link
                    href={`/learn/${unpretty(rank)}/${element.id}`}
                    key={index}
                    className='relative rounded-md bg-neutral-700 border border-neutral-500 hover:bg-neutral-600 transition-all cursor-pointer px-6 py-4 flex justify-start items-center'
                  >
                    <div className=' rounded-full mr-8 robo text-4xl text-primc pb-1'>{element.number}</div>
                    <div className=''>
                      <div>
                        <h2 className='robo text-2xl'>{element.title}</h2>
                        <p className='robo text-neutral-400'>{element.description}</p>
                      </div>
                      {/* <div className='absolute right-12 bg-backL rounded-full h-12 w-12'></div> */}
                    </div>
                  </Link>
                ))
              : ''}
          </div>
        </div>
        <div className=' bottom-8 absolute  w-full robo rounded-md flex justify-center items-center gap-2'>
          <div className='bg-neutral-700 px-4 py-2 rounded-md flex justify-center items-center gap-3 big-shadow'>
            <span>Viewing Chapters of</span>
            <DropdownMenu defaultValue={rank} opts={ranks} whenChange={(e) => setRank(e)}></DropdownMenu>
          </div>
        </div>
      </div>
    </NicePage>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     SSG                                    */
/* -------------------------------------------------------------------------- */

export async function getStaticProps({ params }) {
  const chaps = await getAllGuides();
  return { props: { chaps: chaps } };
}

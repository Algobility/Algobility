import { useEffect, useState } from 'react';
import NicePage from '../../components/nicepage';
import { useUser } from '../../customStuff/useDB';
import useRank from '../../customStuff/useRank';
import DropdownMenu from '../../components/Menu';
import Link from 'next/link';
import { getAllGuides } from '../../customStuff/guides';
import { rankDescription, ranks, unpretty } from '../../customStuff/nameMapping';
import { useDisclosure, ScaleFade } from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';

export default function LearnIndex({ chaps }) {
  let { userData, getSignedState } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rank, setRank] = useState('loading');

  console.log(isOpen);

  useEffect(() => {
    const go = async () => {
      const signedState = await getSignedState();
      useRank(userData, signedState, (newRank) => {
        setRank(newRank);
      });
    };
    go();
  }, [userData]);

  return (
    <>
      <NicePage selected='learn' title='Guides'>
        <div className=' min-h-screen relative'>
          <div className='flex flex-col lg:flex-row  justify-between items-center pt-44 pb-12 px-4 mb-12 mx-auto w-3/4 border-b'>
            <div className='lg:w-1/2 mb-12 lg:mb-0  '>
              <h1 className='mont text-6xl text-primc mb-2'>{rank}</h1>
              <p className='mont text-neutral-300'>{rankDescription[unpretty(rank)]}</p>
              <button
                className='w-full hover:cursor-pointer bg-neutral-700 px-4 py-2 mt-6 mid-shadow mont flex justify-center rounded-md'
                onClick={onOpen}
              >
                View another rank
              </button>
              {isOpen && (
                <div className=' fixed top-0 left-0 z-10 p-4 w-full h-full flex justify-center items-center '>
                  <div className='scalefade w-4/5 gap-14 p-14 shadow-2xl h-4/5 mt-8 rounded-lg bg-backL grid grid-rows-2 grid-cols-3 relative'>
                    {ranks.map((e) => (
                      <div className='rounded-md p-8' key={e}>
                        <h1 className='text-4xl text-bold mont border-l-2 border-primc pl-2'>{e}</h1>
                        <p className='mont text-neutral-300 mt-4 text-sm'>{rankDescription[unpretty(e)]}</p>
                        <button
                          onClick={() => {
                            setRank(e);
                            onClose();
                          }}
                          className=' mont mt-6 bg-neutral-600 px-4 py-2 rounded-md hover:bg-primc transition-all'
                        >
                          View this rank
                        </button>
                      </div>
                    ))}
                    <div
                      onClick={onClose}
                      className='absolute cursor-pointer hover:bg-neutral-600 top-8 right-10 mont scale-150 bg-neutral-700 rounded-full w-10 h-10 flex justify-center items-center'
                    >
                      {' '}
                      X
                    </div>
                    {/* <div></div>
                    <div className='flex justify-center items-center flex-col gap-8 mt-8 '>
                      <div onClick={onClose} className='rounded-md px-4 py-2 transition-all italic text-center  mont'>
                        You can view guides of other ranks but you will still have to compete in your rank.
                      </div> 
                      <button
                        onClick={onClose}
                        className='rounded-md px-4 py-2 transition-all hover:bg-primc bg-neutral-600 mont'
                      >
                        Close
                      </button>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
            <div className='w-auto flex justify-center items-center flex-col bg-neutral-700 p-6 border border-neutral-500 rounded-md'>
              <h2 className='text-center robo mb-4'>
                New to competitive programming? Learn more about it from this post
              </h2>
              <Link
                href={`/IntroToCompetitiveProgramming`}
                className='robo  px-4 py-2 w-full bg-primc hover:bg-cyan-800 transition-all rounded-md flex justify-between items-center'
              >
                Go to Guide
                <BiLinkExternal />
              </Link>
            </div>
          </div>
          <div className='flex justify-center items-start w-full pb-24'>
            <div className='grid grid-cols-1 gap-4 w-3/4 mt-12 '>
              {rank != 'loading'
                ? chaps[unpretty(rank)].map((element, index) => (
                    <Link
                      href={`/learn/${unpretty(rank)}/${element.id}`}
                      key={index}
                      className='relative rounded-md bg-neutral-700 border border-neutral-500 hover:bg-neutral-600 transition-all cursor-pointer px-6 py-4 flex justify-start items-center'
                    >
                      <div className=' rounded-full mr-8 robo text-4xl text-primc pb-1'>{element.id}</div>
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
          {/* <div className=' bottom-8 absolute  w-full robo rounded-md flex justify-center items-center gap-2'>
          <div className='bg-neutral-700 px-4 py-2 rounded-md flex justify-center items-center gap-3 mid-shadow'>
            <span>Viewing Chapters of</span>
            <DropdownMenu defaultValue={rank} opts={ranks} whenChange={(e) => setRank(e)}></DropdownMenu>
          </div>
        </div> */}
        </div>
      </NicePage>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     SSG                                    */
/* -------------------------------------------------------------------------- */

export async function getStaticProps({ params }) {
  const chaps = await getAllGuides();
  return { props: { chaps: chaps } };
}

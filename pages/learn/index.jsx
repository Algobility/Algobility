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
        <div
          className=' min-h-screen relative mont'
          onKeyDownCapture={(e) => {
            if (e.key == 'Escape') onClose();
          }}
        >
          <div className='flex flex-col lg:flex-row  justify-between items-center pt-44 pb-12 px-4 mb-12 mx-auto w-3/4 border-b gap-24'>
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
                <div className='fixed blur-bd inset-0 z-10 p-4 w-full flex justify-center items-center bg-black bg-opacity-50 '>
                  <div
                    className=' relative w-5/6 bg-backL rounded-lg shadow-2xl p-8 md:p-14 mt-24 
                    max-h-[80vh] grid gap-6 scalefade 
                    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto overflow-auto  '
                  >
                    {/* Rank Cards */}
                    {ranks.map((e) => (
                      <div
                        key={e}
                        className='flex flex-col justify-between rounded-md p-4 sm:p-6 border border-neutral-500 bg-neutral-800'
                      >
                        <h1 className='text-lg sm:text-xl lg:text-3xl font-bold mont border-l-2 border-primc pl-2'>
                          {e}
                        </h1>
                        <p className='mont text-neutral-300 mt-2 sm:mt-4 text-sm sm:text-base'>
                          {rankDescription[unpretty(e)]}
                        </p>
                        <button
                          onClick={() => {
                            setRank(e);
                            onClose();
                          }}
                          className='mont mt-4 bg-neutral-600 px-3 py-2 rounded-md hover:bg-primc transition-all w-full text-sm sm:text-base bottom-1'
                        >
                          View
                        </button>
                      </div>
                    ))}
                    {/* Top bar with X and Close button */}
                    <div className='col-span-full flex justify-center items-center gap-2 mb-2 w-full '>
                      <div
                        onClick={onClose}
                        className='cursor-pointer hover:bg-neutral-600 bg-neutral-700 rounded-sm w-full h-8 flex justify-center items-center text-white text-lg'
                      >
                        Close
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {rank != 'Iron' ? (
              <div className='flex-1 flex justify-center items-center flex-col bg-neutral-700 p-6 border border-neutral-500 rounded-md'>
                <h2 className='text-left w-full robo mb-4'>
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
            ) : (
              <div className='flex-1 flex justify-center items-center flex-col bg-neutral-700 p-6 border border-neutral-500 rounded-md'>
                <h2 className='text-left w-full robo mb-4'>
                  Done with the guides? Practice the topics on the Practice Page
                </h2>
                <Link
                  href={`/practice`}
                  className='robo  px-4 py-2 w-full bg-primc hover:bg-cyan-800 transition-all rounded-md flex justify-between items-center'
                >
                  Go to Practice
                  <BiLinkExternal />
                </Link>
              </div>
            )}
          </div>
          <div className='flex justify-center items-start w-full pb-24'>
            <div className='grid grid-cols-1 gap-4 w-3/4 mt-12 '>
              {rank != 'loading'
                ? chaps[unpretty(rank)].map((element, index) => (
                    <div className='flex justify-start items-center'>
                      <div className='flex justify-center items-center mr-8 robo w-16  h-full  '>
                        <div className='h-full w-2 rounded-lg -z-20 bg-neutral-600 scale-y-150'></div>
                        <div className='absolute text-4xl text-neutral-300  w-16 h-16 border bg-neutral-700 rounded-full flex justify-center items-center'>
                          {element.id}
                        </div>
                      </div>
                      <Link
                        href={`/learn/${unpretty(rank)}/${element.id}`}
                        key={index}
                        className='relative flex-1 rounded-md bg-neutral-700 border border-neutral-500 hover:bg-neutral-600 transition-all cursor-pointer px-6 py-4 flex justify-start items-center'
                      >
                        <div className=''>
                          <div>
                            <h2 className='robo text-2xl'>{element.title}</h2>
                            <p className='robo text-neutral-400'>{element.description}</p>
                          </div>
                          {/* <div className='absolute right-12 bg-backL rounded-full h-12 w-12'></div> */}
                        </div>
                      </Link>
                    </div>
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


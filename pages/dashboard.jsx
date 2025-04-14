import NicePage from '../components/nicepage';
import { useState, useRef, useEffect } from 'react';
import { Center, Kbd, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../customStuff/useDB.js';
import { prettyCRank } from '../customStuff/nameMapping';
import { getUpcomingContests } from '../customStuff/contest';
import { useRouter } from 'next/router';

export default function DashBoard({ contests }) {
  const terminalOpener = useRef();
  const toast = useToast();
  const { userData, updateUserData, forceFetch, logoutUser } = useUser();
  const router = useRouter();
  // const rankCard = useRef();
  const [terminalOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  const { getSignedState } = useUser();
  const [signedState, setSignedState] = useState(true);

  useEffect(() => {
    const go = async () => {
      const fetch = await getSignedState();
      setSignedState(fetch);
    };
    go();
  }, []);

  console.log(contests);

  // useEffect(() => {
  //   document.addEventListener('mousemove', (event) => {
  //     if (rankCard && rankCard.current) {
  //       const { top, right, bottom, left } = rankCard.current.getBoundingClientRect();
  //       if (event.clientX >= left && event.clientX <= right && event.clientY >= top && event.clientY <= bottom) {
  //         setHovering(true);
  //       } else {
  //         setHovering(false);
  //       }
  //     }
  //   });
  // }, []);

  return (
    <NicePage terminalOpener={terminalOpener} isTerminalOpen={terminalOpen} selected='dashboard' title='Dashboard'>
      {!signedState ? (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          <h1 className='mont text-4xl '>Sign in required</h1>
          <h2 className='mont text-neutral-400 mt-3 text-center'>
            This page provides you with some data that is linked to your account. <br /> You will need to sign in order
            to view this page.
          </h2>
          <a
            href='/signin'
            className='mt-12 robo bg-primc rounded-md px-4 py-2 cursor-pointer transition-all hover:px-8'
          >
            Sign in page
          </a>
        </div>
      ) : (
        <div className=' w-full'>
          <Center className=' w-full mt-52 lg:mt-36 '>
            <div
              // ref={rankCard}
              className='flex w-full gap-12 lg:w-7/12  cursor-pointer justify-center items-center  px-8 lg:px-32 py-6   transition-all '
            >
              <Image
                alt='rank-icon'
                src={`/rank-icons/${userData.cRank}.png`}
                width={1000}
                height={1000}
                className={`hidden lg:block lg:w-48 transition-all ${hovering ? 'opacity-0' : ''}`}
              ></Image>
              <div
                className={` w-full flex-1   transition-all flex flex-col justify-center  h-full items-center lg:items-stretch ${
                  hovering ? 'opacity-0' : ''
                }`}
              >
                <h1 className=' mb-8 lg:mb-4  mont text-6xl lg:text-8xl w-max '>{prettyCRank(userData.cRank)}</h1>
                {userData.cRank != 'unranked' ? (
                  <div className='w-3/4 lg:w-full'>
                    <div className='justify-between mb-2 flex'>
                      <p className='robo pl-2  '>Rank progress: </p>
                      <p className='robo text-right pr-2 '>50%</p>
                    </div>
                    <div className={`w-full h-2 bg-neutral-700 rounded-md `}>
                      <div className={`w-1/2 bg-primc h-2 rounded-md`}></div>
                    </div>
                  </div>
                ) : (
                  <p className='px-2 robo italic text-center '>
                    Complete your first competition to receive your competitive rank
                  </p>
                )}
              </div>
            </div>
          </Center>
          <div className='flex justify-center w-full  mt-24 mb-12 ' style={{ height: '600px' }}>
            <div className=' w-3/4 h-full lg:grid grid-cols-3 grid-rows-2 lg:gap-8 gap-4  flex flex-col '>
              <div
                onClick={() => {
                  logoutUser();
                  router.push('/signin');
                }}
                className='w-full h-full rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6 relative'
                // ref={terminalOpener}
              >
                <h2 className='robo text-3xl mb-1 text-red-400'>Sign Out</h2>
                <h3 className='robo text-base mb-4 text-red-200'>Click here to sign out or switch accounts.</h3>
                <span className='text-xl absolute bottom-0 mb-4 hidden lg:show '>
                  <span className='bg-backL px-2 py-1 rounded-md shadow-md'>ctrl</span> +{' '}
                  <Kbd className='bg-backL px-2 py-1 rounded-md shadow-md'>space</Kbd>
                </span>
              </div>
              <Link
                href={`/viewProfile/${userData.username}`}
                className=' rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6 relative  '
              >
                <h1 className='robo text-3xl mb-1'>View Profile</h1>
                <p className='text-base robo pb-12'>Click here to view your profile page</p>
                <button
                  className=' bottom-4 z-10 robo px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md absolute left-4'
                  onClick={(event) => {
                    event.preventDefault();
                    navigator.clipboard.writeText(`${window.location.origin}/viewProfile/${userData.username}`);
                    toast({
                      title: 'Profile link copied to clipboard',
                      description: 'Send this link to whoever you wish to share your profile with',
                      status: 'success',
                      isClosable: true,
                    });
                  }}
                >
                  Copy link
                </button>
              </Link>
              <Link
                href='/compete'
                className='row-span-2 rounded-lg  cursor-pointer  border-primc  transition-all border p-6'
              >
                <h1 className='robo text-3xl mb-1'>Upcoming Contests</h1>
                <h2 className='robo mb-8'>Click here to view compete page</h2>
                {contests.length == 0 ? (
                  <span className='text-base italic robo text-center w-full'>No Upcoming Contests</span>
                ) : (
                  contests.map((e, index) => (
                    <div
                      key={index}
                      className='robo hover:bg-primc transition-all bg-neutral-700 rounded-md px-4 py-2 mb-4 flex'
                    >
                      <span>{e.name}</span>
                      <span className='flex-1 text-right'>
                        {new Date(e.startTime).toLocaleDateString()}
                        {' @ '}
                        {new Date(e.startTime).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </Link>
              <div className='col-span-2 rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6'>
                <h1 className='robo text-3xl mb-4'>Recent Contests</h1>
                <span className='text-base italic robo text-center w-full'>No Recent Contests</span>
              </div>
            </div>
          </div>
          {/* {!terminalOpen ? <Tooly text={'View Rank System'} refo={rankCard}></Tooly> : ''} */}
        </div>
      )}
    </NicePage>
  );
}

export async function getStaticProps() {
  const data = await getUpcomingContests();
  data.sort((a, b) => {
    return a.startTime > b.startTime ? 1 : -1;
  });
  return {
    props: {
      contests: data,
    },
  };
}


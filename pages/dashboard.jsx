import NicePage from '../components/nicepage';
import { useState, useRef, useEffect } from 'react';
import {
  Flex,
  Center,
  Heading,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  HStack,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Kbd,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import Tilty from 'react-tilty';
import Tooly from '../components/Tooly';

import { useUser } from '../customStuff/useDB.js';
import { prettyCRank } from '../customStuff/nameMapping';

export default function DashBoard() {
  const terminalOpener = useRef();
  const toast = useToast();
  const { userData, updateUserData, forceFetch } = useUser();
  // const rankCard = useRef();
  const [terminalOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

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
    <NicePage terminalOpener={terminalOpener} isTerminalOpen={terminalOpen} selected='dashboard'>
      <div className=' w-full'>
        <Center className=' w-full mt-52 lg:mt-36 '>
          <HStack
            // ref={rankCard}
            gap={{ md: 12, sm: 100 }}
            className='w-full lg:w-7/12   cursor-pointer justify-center items-center  px-32 py-6  transition-all '
          >
            <Image
              alt='rank-icon'
              src={`/rank-icons/${userData.cRank}.png`}
              width={1000}
              height={1000}
              className={` w-24 md:w-48 transition-all ${hovering ? 'opacity-0' : ''}`}
            ></Image>
            <div
              className={` w-full transition-all flex flex-col justify-center  h-full ${hovering ? 'opacity-0' : ''}`}
            >
              <h1 className=' md:mb-4 mont text-3xl md:text-8xl w-max '>{prettyCRank(userData.cRank)}</h1>
              {userData.cRank != 'unranked' ? (
                <div className=' hidden md:block'>
                  <div className='justify-between mb-2 flex'>
                    <p className='robo pl-2  '>Rank progress: </p>
                    <p className='robo text-right pr-2 '>50%</p>
                  </div>
                  <div className={`w-full h-2 bg-neutral-700 rounded-md `}>
                    <div className={`w-1/2 bg-primc h-2 rounded-md`}></div>
                  </div>
                </div>
              ) : (
                <p className='px-2 robo italic'>Complete your first competition to receive your competitive rank</p>
              )}
            </div>
          </HStack>
        </Center>
        <div className='flex justify-center w-full  mt-24 mb-12 ' style={{ height: '600px' }}>
          <div className=' w-3/4 h-full lg:grid grid-cols-3 grid-rows-2 lg:gap-8 gap-4  flex flex-col '>
            <div
              className='w-full h-full rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6 relative'
              ref={terminalOpener}
            >
              <h2 className='robo text-3xl mb-1'>Open Terminal</h2>
              <h3 className='robo text-base mb-4'>Navigate pages with your keyboard</h3>
              <span className='text-xl absolute bottom-0 mb-4 hidden lg:show'>
                <Kbd className='bg-backL px-2 py-1 rounded-md shadow-md'>ctrl</Kbd> +{' '}
                <Kbd className='bg-backL px-2 py-1 rounded-md shadow-md'>space</Kbd>
              </span>
            </div>
            <div className=' rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6'>
              <h1 className='robo text-3xl mb-4'>View Profile</h1>
              <span className='text-base robo'>Click here to view your profile page</span>
            </div>
            <div className='row-span-2 rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6'>
              <h1 className='robo text-3xl mb-4'>Upcoming Contests</h1>
              <span className='text-base italic robo text-center w-full'>No Upcoming Contests</span>
            </div>
            <div className='col-span-2 rounded-lg hover:bg-primc cursor-pointer  border-primc  transition-all border p-6'>
              <h1 className='robo text-3xl mb-4'>Recent Contests</h1>
              <span className='text-base italic robo text-center w-full'>No Recent Contests</span>
            </div>
          </div>
        </div>
        {/* {!terminalOpen ? <Tooly text={'View Rank System'} refo={rankCard}></Tooly> : ''} */}
      </div>
    </NicePage>
  );
}

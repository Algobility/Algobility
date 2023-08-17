import styles from '../cssModules/nav.module.css';
import { useEffect, useRef, useState } from 'react';
import { Button, IconButton, Slide, useDisclosure, Box, Lorem, CloseButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Navel from './navel';
import Mnavel from './Mnavel.jsx';
import { FaHome, FaChalkboardTeacher, FaCode } from 'react-icons/fa';
import { BsConeStriped } from 'react-icons/bs';
import { useRouter } from 'next/router';

function myDashboardIcon(props) {
  return (
    <span className='px-1'>
      <svg
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        viewBox='0 0 24 24'
        height='1em'
        width='1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g>
          <path fill='none' d='M0 0h24v24H0z'></path>
          <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'></path>
        </g>
      </svg>
    </span>
  );
}

export default function MobileNav(props) {
  const { isOpen, onToggle } = useDisclosure();
  function handle() {
    onToggle();
  }
  const [sendPage, setSendPage] = useState('-1');
  const router = useRouter();
  useEffect(() => {
    if (sendPage != '-1') router.push(sendPage);
  }, [sendPage]);
  return (
    <>
      <div className={props.className}>
        <div className='flex fixed top-14 right-14 justify-end'>
          <IconButton
            aria-label='MobileNav'
            boxSize='14'
            variant='ghost'
            icon={<HamburgerIcon />}
            onClick={handle}
            className='scale-150 border rounded-full bg-back'
          />
        </div>
      </div>
      <Slide direction='right' in={isOpen} style={{ zIndex: 49 }}>
        <Box color='white' p='14' className='bg-neutral-700' rounded='md' shadow='md' h='full'>
          <CloseButton boxSize='14' mt='0' onClick={onToggle} className='scale-150 border rounded-full' />
          <div className='flex flex-col justify-start items-start h-1/2 mt-24'>
            <Mnavel name='Home' icon={FaHome} selected={props.selected == 'home'} onClicky={() => setSendPage('/')} />
            <Mnavel
              name='Train'
              icon={BsConeStriped}
              selected={props.selected == 'learn'}
              onClicky={() => setSendPage('/learn')}
            />
            <Mnavel
              name='Practice'
              icon={FaCode}
              selected={props.selected == 'practice'}
              onClicky={() => setSendPage('/practice')}
            />
            <Mnavel
              name='Dashboard'
              icon={myDashboardIcon}
              selected={props.selected == 'dashboard'}
              onClicky={() => setSendPage('/dashboard')}
            />
          </div>
          <div className='w-full rounded-md border border-neutral-400 bg-neutral-600 mx-auto robo p-8'>
            <h3 className='text-primc text-xl border-b border-neutral-600 pb-2'>Hey Mobile Users 👋</h3>
            <p>
              This website is currently under development and we haven't quite optimized it for smaller screens. Until
              then, we suggest all our users to use larger displays to get the best experience.
            </p>
          </div>
        </Box>
      </Slide>
    </>
  );
}

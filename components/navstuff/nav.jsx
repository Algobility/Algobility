import styles from '../cssModules/nav.module.css';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Navel from './navel';
import Link from 'next/link';

import { Menu, MenuItem } from '@mui/material';

import { useUser } from '../../customStuff/useDB';
import { useRouter } from 'next/router';
import { FaHome, FaCode, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { AiFillFileText } from 'react-icons/ai';
import { RiSwordFill } from 'react-icons/ri';

export default function Nav(props) {
  const { getSignedState, userData, logoutUser } = useUser();
  const [sendPage, setSendPage] = useState('-1');
  const router = useRouter();

  //Get signed state
  const [signedState, setMebutYouWont] = useState(true);
  useEffect(() => {
    const go = async () => {
      const no = await getSignedState();
      setMebutYouWont(no);
    };
    go();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action) => {
    return () => {
      if (action == 'settings') router.push('/settings');
      if (action == 'profile') router.push(`/viewProfile/${userData.username}`);
      if (action == 'logout') {
        logoutUser();
        router.push('/signin');
      }
      setAnchorEl(null);
    };
  };

  useEffect(() => {
    if (sendPage != '-1') router.push(sendPage);
  }, [sendPage]);

  return (
    <div className={props.className}>
      <div className='fixed top-8 flex justify-center items-center h-8 w-full big-shadow bg-back '>
        <div
          className='
        w-1/2 rounded-full flex justify-start items-center h-full shadow-xl 
        px-4
         cursor-pointer'
        >
          <Navel name='Home' icon={FaHome} selected={props.selected == 'home'} onClicky={() => setSendPage('/')} />
          <Navel
            name='Guides'
            icon={FaBook}
            selected={props.selected == 'learn'}
            onClicky={() => setSendPage('/learn')}
          />
          <Navel
            name='Practice'
            icon={FaCode}
            selected={props.selected == 'practice'}
            onClicky={() => setSendPage('/practice')}
          />
          <Navel
            name='Compete'
            icon={RiSwordFill}
            selected={props.selected == 'compete'}
            onClicky={() => setSendPage('/compete')}
          />
        </div>
      </div>
      <div className='fixed top-8 right-16 flex justify-end items-center h-8 '>
        {signedState ? (
          <div className='relative'>
            <Link
              href='/dashboard'
              className={`robo text-neutral-200 rounded-full shadow-xl px-6 py-2 hover:bg-primc ${
                props.selected == 'dashboard' ? 'bg-primc' : 'bg-backL'
              } transition-all`}
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <button
            className='big-shadow robo bg-backL text-neutral-200 rounded-full shadow-xl px-6 py-2 hover:bg-primc transition-all'
            onClick={() => router.push('/signin')}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

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


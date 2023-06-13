import styles from '../cssModules/nav.module.css';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Navel from './navel';

import { Menu, MenuItem } from '@mui/material';

import { useUser } from '../../customStuff/useDB';
import { useRouter } from 'next/router';
import { FaHome, FaChalkboardTeacher, FaCode } from 'react-icons/fa';
import { BsConeStriped } from 'react-icons/bs';

export default function Nav(props) {
  const { signedState, userData, logoutUser } = useUser();
  const [sendPage, setSendPage] = useState('-1');
  const router = useRouter();

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
    console.log(props);
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
            name='Train'
            icon={BsConeStriped}
            selected={props.selected == 'learn'}
            onClicky={() => setSendPage('/learn')}
          />
          {/* <Navel
            name='Practice'
            icon={FaCode}
            selected={props.selected == 'practice'}
            onClicky={() => setSendPage('/practice')}
          /> */}
          <Navel
            name='Dashboard'
            icon={myDashboardIcon}
            selected={props.selected == 'dashboard'}
            onClicky={() => setSendPage('/dashboard')}
          />
        </div>
      </div>
      <div className='fixed top-8 right-16 flex justify-end items-center h-8 '>
        {signedState ? (
          <div className=' relative'>
            <button
              className=' robo bg-backL text-neutral-200 rounded-full shadow-xl px-6 py-2 hover:bg-primc transition-all'
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
              onClick={handleClick}
            >
              My Account
            </button>
            <Menu
              id='account'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose()}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              className='mt-4 ml-2 text-right'
            >
              <MenuItem onClick={handleClose('profile')}>View Profile</MenuItem>
              <MenuItem onClick={handleClose('settings')}>Settings</MenuItem>
              <MenuItem onClick={handleClose('logout')} className='text-red-400'>
                Logout
              </MenuItem>
            </Menu>
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
        stroke-width='0'
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

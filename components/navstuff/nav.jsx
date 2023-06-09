import styles from '../cssModules/nav.module.css';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Navel from './navel';

import { useUser } from '../../customStuff/useDB';
import { useRouter } from 'next/router';
import { FaHome, FaChalkboardTeacher, FaCode } from 'react-icons/fa';
import { BsConeStriped } from 'react-icons/bs';

export default function Nav(props) {
  const { signedState } = useUser();
  const [sendPage, setSendPage] = useState('-1');
  const router = useRouter();

  useEffect(() => {
    if (sendPage != '-1') router.push(sendPage);
  }, [sendPage]);

  return (
    <div className={props.className}>
      <div className='fixed top-8 flex justify-center items-center h-8 w-full '>
        <div
          className='
        w-1/2 rounded-full flex justify-start items-center h-full shadow-xl 
        px-4
        big-shadow cursor-pointer'
        >
          <Navel name='Home' icon={FaHome} selected={props.selected == 'home'} onClicky={() => setSendPage('/')} />
          <Navel
            name='Train'
            icon={BsConeStriped}
            selected={props.selected == 'learn'}
            onClicky={() => setSendPage('/learn')}
          />
          <Navel
            name='Practice'
            icon={FaCode}
            selected={props.selected == 'practice'}
            onClicky={() => setSendPage('/practice')}
          />
        </div>
      </div>
      <div className='fixed top-8 right-16 flex justify-end items-center h-8 '>
        {signedState ? (
          <button
            className='big-shadow robo bg-backL text-neutral-200 rounded-full shadow-xl px-6 py-2 hover:bg-primc transition-all'
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
            onClick={() => {
              props.openTerminalCallback();
            }}
          >
            Open Terminal
          </button>
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

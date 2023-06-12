import Blob from '../components/blob.jsx';
import Nav from '../components/navstuff/nav.jsx';
import CircleBtn from '../components/circleBtn.jsx';
import Hack from '../components/hack.jsx';
import { Button, Center, Tooltip, Heading, Stack, Fade, Slide } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import NicePage from '../components/nicepage.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import Head from 'next/head.js';
import Script from 'next/script.js';
import Tilty from 'react-tilty';
import Link from 'next/link.js';

export default function Landing() {
  const [showScroll, setShowScroll] = useState(true);
  let scrollPosition = 0;

  useEffect(() => {
    function checkScrollPosition() {
      if (window) scrollPosition = window.scrollY || window.pageYOffset;
      if (scrollPosition > 0) {
        setShowScroll(false);
        console.log('nice');
      }

      var interval = 500;
      setTimeout(checkScrollPosition, interval);
    }

    checkScrollPosition();
  }, []);

  return (
    <>
      <NicePage selected='home'>
        <div className='w-full overflow-hidden'>
          <div className='h-screen flex-col lg:mt-24 '>
            <div className='flex flex-col justify-center items-center lg:mt-44 mt-64 mb-12'>
              <Hack text='PROJECT A' classy='text-6xl md:text-9xl text-primc'></Hack>
              <h2 className='text-xl md:text-4xl mt-4 mont'>
                Programming as a <span className='text-primc underline italic'>sport</span>{' '}
              </h2>
              <Link
                href='signin'
                className='mono text-white bg-transparent hover:bg-primc border-primc  rounded-full mt-8 px-8 py-2 hover:px-14 transition-all border '
              >
                .getStarted()
              </Link>
            </div>

            {/* -------------------------------------------------------------------------- */
            /*                                Cards method                                */
            /* -------------------------------------------------------------------------- */}
            <div className=' flex flex-col lg:flex-row scale-75 lg:scale-100 items-center justify-center pt-32 lg:gap-12 w-3/4 mx-auto '>
              {/* <div className='bg-backL w-80 rounded shadow-xl'>
                <div className='rounded-md bg-primc px-8 py-4 mont text-xl flex justify-start gap-3 items-center'>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='10 10 320 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z'></path>
                  </svg>
                  <span>Strucuted Progression</span>
                </div>
                <div className='p-8 robo text-md'>
                  With a clearly laid out roadmap, <br /> <br /> Project A helps you master the sport with ease
                </div>
              </div>
              <div className='bg-backL w-80 rounded shadow-xl'>
                <div className='rounded-md bg-primc px-8 py-4 mont text-xl flex justify-start gap-3 items-center'>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                  </svg>
                  <span>Beginner Friendly</span>
                </div>
                <div className='p-8 robo text-md'>
                  Whether you are a seasoned competitive programmer
                  <br />
                  <br />
                  or completely new to programming,
                  <br />
                  <br />
                  Project A is lets you hone your skill
                </div>
              </div>
              <div className='bg-backL w-80 rounded shadow-xl'>
                <div className='rounded-md bg-primc px-8 py-4 mont text-xl flex justify-start gap-3 items-center'>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                  </svg>
                  <span>Beginner Friendly</span>
                </div>
              </div> */}

              <div className=' w-80 rounded p-4 text-center mb-4'>
                <h2 className='text-4xl text-primc mb-4 mont'>Train</h2>
                <p className='robo text-lg'>Learn competitive programming topics through interactive tutorials</p>
              </div>

              <svg
                className='hidden lg:block'
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
                height='3em'
                width='3em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <polyline points='13 17 18 12 13 7'></polyline>
                <polyline points='6 17 11 12 6 7'></polyline>
              </svg>

              <div className=' w-80 rounded p-4 text-center mb-4'>
                <h2 className='text-4xl text-primc mb-4 mont'>Compete</h2>
                <p className='robo text-lg'>
                  Participate in weekly or monthly competitions and show what you have learned
                </p>
              </div>

              <svg
                className=' hidden lg:block'
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
                height='3em'
                width='3em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <polyline points='13 17 18 12 13 7'></polyline>
                <polyline points='6 17 11 12 6 7'></polyline>
              </svg>

              <div className=' w-80 rounded p-4 text-center mb-4'>
                <h2 className='text-4xl text-primc mb-4 mont'>Climb</h2>
                <p className='robo text-lg'>
                  Climb the ranks as you participate in competitions and build your portfolio
                </p>
              </div>
            </div>
          </div>
          hello
          <Slide in={showScroll} direction='bottom'>
            <div className=' sticky  pb-12  robo lg:flex justify-center items-center gap-2 hidden w-96 '>
              <div className='px-4 py-2 bouncy rounded-md flex justify-start items-center gap-2 border'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  stroke-width='0'
                  viewBox='0 0 24 24'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M11.975,22H12c3.859,0,7-3.14,7-7V9c0-3.841-3.127-6.974-6.981-7C12.013,2,12.006,2,12,2c-0.002,0-0.016,0-0.018,0 c-0.009,0-0.016,0-0.023,0C8.119,2.022,5,5.157,5,9v6C5,18.86,8.129,22,11.975,22z M7,9c0-2.751,2.238-4.994,4.985-5 C14.75,4.006,17,6.249,17,9v6c0,2.757-2.243,5-5,5h-0.025C9.186,20,7,17.804,7,15V9z'></path>
                  <path d='M11 6H13V12H11z'></path>
                </svg>{' '}
                <p className='text-xl '>Scroll Down</p>
              </div>
            </div>
          </Slide>
          {/* <div className='absolute top-h left-14 w-1/6 border aspect-square hidden md:block '> */}
          {/* <CircleBtn
              callback={() => {
                window.scrollTo({ top: 800, behavior: 'smooth' });
              }}
            ></CircleBtn> */}
          {/* </div> */}
        </div>
      </NicePage>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Snippets method                                */
/* -------------------------------------------------------------------------- */

{
  /* <div className='w-3/4 justify-center gap-12 flex-col flex md:flex-row  items-center md:items-stretch'>
                <div className=' p-8 w-80 border lg:border-0 rounded-md '>
                  <div className='flex text-primc justify-start items-center robo text-xl  gap-3'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      stroke-width='0'
                      viewBox='0 0 384 512'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'></path>
                    </svg>
                    <span>Blah blah</span>
                  </div>
                  <div className='mt-6  flex justfiy-start items-start gap-3'>
                    <svg
                      className='mt-1 text-primc scale-150'
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 1024 1024'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z'></path>
                    </svg>
                    <p className='robo'>
                      Forget scouring blah blah blah
                      <br />
                      <br />
                      blah blah blah Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, quis.
                    </p>
                  </div>
                </div>
                <div className=' p-8 w-80 border lg:border-0 rounded-md '>
                  <div className='flex text-primc justify-start items-center robo text-xl  gap-3'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 512 512'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                    </svg>
                    <span>Begginer Friendly</span>
                  </div>
                  <div className='mt-6  flex justfiy-start items-start gap-3'>
                    <svg
                      className='mt-1 text-primc scale-150'
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 1024 1024'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z'></path>
                    </svg>
                    <p className='robo'>
                      Wheather you are a seasoned competitive programmer
                      <br />
                      <br />
                      or completeley new to programming
                      <br />
                      <br />
                      Project A lets you hone your skill
                    </p>
                  </div>
                </div>
                <div className=' p-8 w-80 border lg:border-0 rounded-md'>
                  <div className='flex text-primc justify-start items-center robo text-xl  gap-3'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 512 512'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z'></path>
                    </svg>
                    <span>Begginer Friendly</span>
                  </div>
                  <div className='mt-6  flex justfiy-start items-start gap-3'>
                    <svg
                      className='mt-1 text-primc scale-150'
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth='0'
                      viewBox='0 0 1024 1024'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z'></path>
                    </svg>
                    <p className='robo'></p>
                  </div>
                </div>
              </div> */
}

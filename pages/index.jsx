import Blob from '../components/blob.jsx';
import Nav from '../components/navstuff/nav.jsx';
import CircleBtn from '../components/circleBtn.jsx';
import Hack from '../components/hack.jsx';
import { Button, Center, Tooltip, Heading, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import NicePage from '../components/nicepage.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import Head from 'next/head.js';
import Script from 'next/script.js';
import Tilty from 'react-tilty';
import Link from 'next/link.js';

export default function Landing() {
  return (
    <>
      <NicePage>
        <div className='w-full '>
          <Center className='h-screen flex-col mt-24'>
            <div className='flex flex-col justify-center items-center'>
              <Hack text='PROJECT A' classy='text-3xl md:text-8xl text-primc'></Hack>
              <h2 className='text-base md:text-2xl mt-4 robo'>
                Programming as a <span className='text-primc underline italic'>sport</span>{' '}
              </h2>
              <Link
                href='signin'
                className='mono text-white bg-transparent hover:bg-primc border-primc border rounded-full mt-8 px-8 py-2 hover:px-14 transition-all'
              >
                .getStarted()
              </Link>
            </div>
            <div className='w-3/4 mt-44 flex justify-center gap-12 '>
              {/* Cards Layout  */}
              {/* <div>
               <div className='bg-backL w-80 rounded shadow-xl'>
                <div className='rounded-md bg-neutral-700 px-8 py-4 mont text-lg flex justify-start gap-3 items-center'>
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
              </div>
              <div className='bg-backL w-80 scale-110 rounded shadow-xl'>
                <div className='rounded-md bg-neutral-700 px-8 py-4 mont text-lg flex justify-start gap-3 items-center'>
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
                <div className='rounded-md bg-neutral-700 px-8 py-4 mont text-lg flex justify-start gap-3 items-center'>
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
              </div> 
            </div> */}
              <div className=' p-8 w-80'>
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
              <div className=' p-8 w-80  '>
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
              <div className=' p-8 w-80'>
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
            </div>
          </Center>
          <div className='mt-24 p-8 mb-20'>
            <h2 className='text-primc text-center text-6xl mont'>How it Works</h2>
          </div>
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

import Hack from '../components/hack.jsx';
import { Slide } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NicePage from '../components/nicepage.jsx';
import Link from 'next/link.js';
import Image from 'next/image.js';
import Head from 'next/head';

export default function Landing() {
  const [showScroll, setShowScroll] = useState(true);
  let scrollPosition = 0;

  useEffect(() => {
    function checkScrollPosition() {
      if (window) scrollPosition = window.scrollY || window.pageYOffset;
      if (scrollPosition > 0) {
        setShowScroll(false);
        // console.log('nice');
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
          <div className='h-full flex-col lg:mt-24 mb-24 '>
            <div className='flex flex-col justify-center items-center lg:mt-52 mt-52 mb-12 px-8 w-3/4 mx-auto'>
              {/* <Hack text='.DOT/SLASH' classy='text-6xl md:text-9xl text-primc'></Hack> */}
              {/* <h2 className='text-xl md:text-xl mt-4 mont text-center'>
                A begginer-friendly competitive programming platform{' '}
              </h2> */}
              <h1 className='mont text-left  text-3xl lg:text-6xl lg:text-center lg:leading-tight'>
                An <span className='text-primc italic font-bold underline'>OOGA BOOGA</span> to take your <br /> Dooga
                Booda to the next level and beyond
              </h1>
              <h2 className='mt-8 robo  text-lg lg:text-xl text-neutral-400'>
                Because that's crazy wowowowow. Thats amazing. This is such a good description
              </h2>
              {/* <Link
                href='signin'
                className='mono text-white bg-transparent hover:bg-primc border-primc  rounded-full mt-16 px-8 py-2 hover:px-14 transition-all border '
              >
                .getStarted()
              </Link> */}
            </div>

            {/* -------------------------------------------------------------------------- */
            /*                                Cards method                                */
            /* -------------------------------------------------------------------------- */}
            <div className=' flex flex-col lg:flex-row scale-75 items-center justify-center pt-28 lg:pt-44 lg:gap-12 w-3/4 mx-auto '>
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
                  With a clearly laid out roadmap, <br /> <br /> DotSlash helps you master the sport with ease
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
                  DotSlash is lets you hone your skill
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

              <div className=' w-80 rounded p-4  text-center mb-4 '>
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

          {/* -------------------------------------------------------------------------- */
          /*                                  Features                                  */
          /* -------------------------------------------------------------------------- */}

          <div className='bg-gradient mb-24'>
            <div className='flex-col lg:grid grid-cols-2 grid-rows-2 my-12 w-4/6 mx-auto'>
              <div className='md:h-96 pb-8 md:pt-0 md:pb-0 pt-24  px-8 flex flex-col justify-center'>
                <h1 className='mont text-4xl text-primc pb-2 glow'>Structured Learning Roadmap </h1>
                <p className='robo text-neutral-300'>
                  Forget trying to learn complex data strucutres and algorithms. DotSlash divides topics into
                  well-organized ranks to help you grasp topics with ease.
                </p>
              </div>
              <div className=' flex justify-center items-center gap-4'>
                <div className='fade-into-bg hidden md:block relative rounded-md   bg-neutral-700'>
                  <div className=' border-2 w-full h-full p-16 flex border-neutral-500 justify-center items-center gap-3'>
                    <Image src='/rank-icons/iron.png' width='100' height='100'></Image>
                    <svg
                      className=''
                      stroke='currentColor'
                      fill='currentColor'
                      stroke-width='0'
                      viewBox='0 0 24 24'
                      height='2em'
                      width='2em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z'></path>
                    </svg>
                    <Image src='/rank-icons/bronze.png' width='100' height='100'></Image>
                    <svg
                      className=''
                      stroke='currentColor'
                      fill='currentColor'
                      stroke-width='0'
                      viewBox='0 0 24 24'
                      height='2em'
                      width='2em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z'></path>
                    </svg>
                    <Image src='/rank-icons/gold.png' width='100' height='100'></Image>
                  </div>
                </div>
              </div>
              <div className=' md:flex justify-center items-center fade-right hidden'>
                <div className='border border-neutral-500 rounded-md bg-neutral-700 w-full h-45 flex justify-start items-center'>
                  <Image src='/rank-icons/iron.png' width='200' height='200' className='rounded-md px-8 py-6'></Image>
                  <div className='flex flex-col justify-start '>
                    <h3 className='text-4xl robo mb-2'>Iron</h3>
                    <p className='robo'>
                      To pass this rank, you are only required to have a solid understanding of fundemental programming
                      concepts such as variables, conditions, loops, etc.{' '}
                    </p>
                  </div>
                </div>
                {/* <Image src='/Images/soeasy.png' width='600' height='100' className='rounded-md'></Image> */}
              </div>
              <div className=''>
                <div className='md:h-96 pb-24 pt-8 md:pb-0 md:pt-0 px-8 flex flex-col justify-center'>
                  <h1 className='mont text-4xl lg:text-right text-primc pb-2 glow'>Beginner Friendly </h1>
                  <p className='robo text-neutral-300 lg:text-right '>
                    Whether you are a seasoned competitive programmer or completely new to programming, DotSlash helps
                    you master the sport
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                                   Socials                                  */
          /* -------------------------------------------------------------------------- */}

          <div className=' mb-36 mt-24 w-3/4 mx-auto flex flex-col lg:grid grid-cols-2 h-96 gap-12'>
            <div className='flex justify-center flex-col  robo py-8'>
              <h2 className='text-6xl mb-4 mont lg:text-left text-center'>
                {' '}
                <span className='text-primc  underline'>Community</span> Centered
              </h2>
              <p className='text-neutral-400 lg:text-left text-center'>
                We value our community over everything. It's what drives us forward. Follow our socials and join our
                discord to be a part of our thriving community.
              </p>
            </div>
            <div className='flex justify-center items-center '>
              <div className=' h-45  flex justify-evenly items-center w-96'>
                <div className='border p-4 scale-150 rounded-full hover:bg-primc transition-all '>
                  <svg
                    stroke='currentColor'
                    fill='cyan'
                    stroke-width='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'></path>
                  </svg>
                </div>
                <div className='border p-4 scale-150 rounded-full hover:bg-pink-400 transition-all '>
                  <svg
                    stroke='pink'
                    fill='pink'
                    stroke-width='0'
                    role='img'
                    viewBox='0 0 24 24'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <title></title>
                    <path d='M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z'></path>
                  </svg>
                </div>
                <div className='border p-4 scale-150 rounded-full hover:bg-blue-300 transition-all '>
                  <svg
                    stroke='currentColor'
                    fill='rgb(30,130,190)'
                    stroke-width='0'
                    viewBox='0 0 448 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z'></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                                   Help us                                  */
          /* -------------------------------------------------------------------------- */}

          <div className=' mx-auto mb-24 flex flex-col lg:grid grid-cols-2 w-4/6 gap-8 lg:gap-16 '>
            <div className='bg-backL border border-neutral-600 py-8 px-12 robo rounded-md'>
              <h2 className='text-4xl text-center mb-4'>Join Us</h2>
              <p className='text-center text-neutral-400'>
                DotSlash is a non-profit DotSlashimed to promote competitive programming. Wheather you are a web
                developer, project manager, or problem-setter, we would love to have you on our journey.{' '}
              </p>
              <a
                href='https://forms.gle/wvhfa1ncoiSkqtwE8'
                target='_blank'
                className='bg-neutral-700 mt-12 w-full px-4 py-2 block hover:bg-primc transition-all mono rounded-md text-center cursor-pointer'
              >
                .joinUs()
              </a>
            </div>
            <div className='bg-backL border border-neutral-600 py-8 px-12 robo rounded-md'>
              <h2 className='text-4xl text-center mb-4'>Support Us</h2>
              <p className='text-center text-neutral-400'>
                Being non-profit, DotSlash is supported financially only by its community. To keep our servers running
                and services online, we need your help.
              </p>
              <a className='bg-neutral-700 mt-12 w-full px-4 py-2 block  hover:bg-primc transition-all mono rounded-md text-center cursor-pointer '>
                .donateNow()
              </a>
            </div>
          </div>
          <div className='bg-neutral-800 w-full px-8 py-8 robo flex flex-col text-center justify-start gap-2 text-neutral-600 '>
            <h3>©️2023 DotSlash</h3>
            <h3>This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.</h3>
          </div>
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
                      DotSlash lets you hone your skill
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

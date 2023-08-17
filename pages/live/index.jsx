import NicePage from '../../components/nicepage';
import Link from 'next/link';
import { getContestInfo } from '../../customStuff/contest';
import { useUser } from '../../customStuff/useDB';
import { getPostData } from '../../customStuff/problems';
import { useState, useEffect } from 'react';

export default function LiveProblem({ contestInfo, probNames }) {
  contestInfo = JSON.parse(contestInfo);
  const { updateUserData, userData } = useUser();
  const [timeRemaining, setTimeRemaining] = useState(`99:99:99`);
  const [hide, setHide] = useState(false);

  function isTimeBetween() {
    const currentTime = new Date();
    const startTime = new Date(contestInfo.startTime);
    const endTime = new Date(contestInfo.endTime);
    return currentTime >= startTime && currentTime <= endTime;
  }

  useEffect(() => {
    if (isTimeBetween()) {
      //if contestTime
      // Update the display every second
      setInterval(updateDisplay, 1000);
    } else {
      setHide(true);
    }
  }, []);

  function getTimeRemaining() {
    const targetDate = new Date(contestInfo.endTime);
    const currentDate = new Date();

    const timeRemaining = targetDate - currentDate;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  function updateDisplay() {
    const time = getTimeRemaining();
    setTimeRemaining(`${time.hours}:${time.minutes}:${time.seconds}`);
  }

  if (hide) {
    return (
      <NicePage selected='compete'>
        <div className='h-screen flex justify-center items-center flex-col'>
          <h1 className='robo text-4xl'>No Live contest</h1>
          <h1 className='robo mt-2'>
            There is currently no live contest. You may be seeing this screen if the time for the most recent contest
            just ended or has not begun
          </h1>
          <a href='/compete' className='px-4 py-2 bg-primc mt-6 robo rounded-md'>
            Back to all contests
          </a>
        </div>
      </NicePage>
    );
  }

  return (
    <NicePage selected='compete'>
      <div className='flex flex-col justify-center  h-screen '>
        {/* <div className='h-32 flex justify-end w-1/2 mx-auto items-center flex-col border-b pb-8  text-center'>
          <h1 className='robo text-4xl'>{contestInfo.name}</h1>
          <h2 className='robo mt-2  text-neutral-400'>
            Try to get as many accepted test cases as possible on each problem before the time runs out
          </h2>
        </div> */}
        <div className=' grid grid-cols-2 w-2/3 mx-auto '>
          <div className='flex justify-center items-center flex-col'>
            <p className='robo'>Time remaining</p>
            <p className='mono text-6xl mt-4'>{timeRemaining}</p>
          </div>
          <div className='flex justify-center items-stretch flex-col gap-4'>
            <Link
              href={`/live/${contestInfo.problems[0]}`}
              className='robo bg-backL hover:bg-neutral-700 border-neutral-600 cursor-pointer border rounded-lg p-4'
            >
              <p className='text-2xl'>Problem 1</p>
              <p>{JSON.parse(probNames)[0]}</p>
            </Link>
            <Link
              href={`/live/${contestInfo.problems[1]}`}
              className='robo bg-backL hover:bg-neutral-700 border-neutral-600 cursor-pointer border rounded-lg p-4'
            >
              <p className='text-2xl'>Problem 2</p>
              <p className=''>{JSON.parse(probNames)[1]}</p>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className='flex justify-center gap-4 items-center '>
        <button
          className='bg-neutral-600 p-8  rounded-lg'
          onClick={() => {
            updateUserData({ rp: userData.rp - 30 });
          }}
        >
          Start
        </button>
      </div>
      <div className='h-screen flex flex-col justify-center items-center p-8'>
        <h1>{contestInfo.name}</h1>
        <Link href='/live/Scary' className='px-4 py-2 rounded-md bg-primc my-3'>
          {contestInfo.problems[0]}
        </Link>
        <Link href='/live/Scary' className='px-4 py-2 rounded-md bg-primc my-3'>
          {contestInfo.problems[1]}
        </Link>
      </div> */}
    </NicePage>
  );
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }

export async function getStaticProps() {
  const contestInfo = await getContestInfo();
  const probNames = [];
  for (let prob of JSON.parse(contestInfo).problems) {
    const probData = await getPostData(prob, true);
    probNames.push(probData.title);
  }
  return {
    props: {
      contestInfo,
      probNames: JSON.stringify(probNames),
    },
  };
}

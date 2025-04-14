import NicePage from '../components/nicepage';
import { getUpcomingContests } from '../customStuff/contest';
import Table from '../components/table';
import { useState, useEffect } from 'react';
import { Slide, Fade, useDisclosure, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { useUser } from '../customStuff/useDB';
import Link from 'next/link';
import { GoLinkExternal } from 'react-icons/go';
import Image from 'next/image';
import { codedRanks } from '../customStuff/nameMapping';

function RulesAndInstructions(props) {
  return (
    <Fade in={props.isOpen}>
      <div className='w-full h-full flex justify-center items-center fixed robo top-0 left-0 blur-bd '>
        <div className='bg-backL w-2/3 p-12 h-2/3 border border-neutral-500  rounded-md overflow-auto absolute'>
          <div className='mono w-2/3 -mx-12 flex justify-end px-12 fixed -my-4  '>
            <span
              onClick={props.onClose}
              className='rounded-full mont bg-neutral-600 hover:bg-neutral-700 transition-all cursor-pointer b w-16 text-center h-16 text-3xl flex justify-center items-center'
            >
              x
            </span>
          </div>
          <h2 className='text-4xl font-bold mt-4 mb-2'>Instructions</h2>
          <ul className='list-disc pl-8 text-neutral-300'>
            <li>
              If this is your first contest, you will compete in your placement rank. This means, you will get problems
              for the rank you choose during account onboarding. If you do well in this contest, this rank will become
              your competitive rank (i.e. the rank that shows on your profile). If you are unable to solve more than
            </li>
            <li>If this is not your first contest, you will compete in your competitive rank.</li>
            <li>
              Once you start your contest, a small amount of RP (Rank Progress) will be deducted from your account.
            </li>
          </ul>
          <h2 className='text-4xl font-bold mt-12 mb-2'>General Advice</h2>
          <ul className='list-disc pl-8 text-neutral-300'>
            <li>
              Before you begin your contest, be sure that you will be able to work throughout the duration of the
              contest. You cannot pause the timer once the contest has begun. Make sure you have a stable internet
              connection. If you are unable to submit your solutions, you may lose RP (Rank Progress).
            </li>
            <li>
              It is strongly suggested, especially for higher ranks, that you have a pen and paper ready before starting
              your contest to aid with problem-solving. Writing down observations about a problem and planning out your
              code can help a lot.
            </li>
          </ul>
          <h2 className='text-4xl font-bold mt-12 mb-2'>Rules</h2>
          <p className=' text-neutral-300 mt-2'>
            Please ensure you have read all the following rules before beggining your contest
          </p>
          <ul className='list-disc pl-8 text-neutral-300'>
            <li>You must not work in a team environment. All solution code must soley be written by you.</li>
            <li>Consultation about the contest problems with people other than the contest director is prohibited.</li>
            <li>
              Do not share any technical information or code pertaining to a contest while it is actively running.
            </li>
            <li>
              Do not use two login IDs in order to participate in more than one division. Do not use another login ID to
              read the problems and circumvent the contest time limits.
            </li>
            <li>
              Do not submit any code that behaves in a malicious way towards the grading machine (i.e., do not try to
              open network connections, intentially slow down the grading machine, etc.). The judging environment
              monitors activities and system calls to prevent forbidden actions. Submission of code must be done via the
              interface on the usaco.org website (i.e., by selecting your file and clicking "submit solution"); attempts
              to submit via other means (e.g., scripts that attempt to automate this process) are NOT permitted.
            </li>
            <li>
              Do not submit any code that behaves in a malicious way towards the grading machine (i.e., do not try to
              open network connections, intentially slow down the grading machine, etc.). The judging environment
              monitors activities and system calls to prevent forbidden actions. Submission of code must be done via the
              interface on the usaco.org website (i.e., by selecting your file and clicking "submit solution"); attempts
              to submit via other means (e.g., scripts that attempt to automate this process) are NOT permitted.
            </li>
          </ul>
          {props.participateButton ? (
            <>
              <p className='text-center text-red-300 italic mt-24'>
                By clicking participate, you will lose some RP (Rank Progress). To gain this RP back, you will have to
                solve the contest problems.
              </p>
              <button className='rounded-md bg-primc w-full text-center py-2 mt-4' onClick={props.onClick}>
                Accept and Participate
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </Fade>
  );
}

export default function Compete({ contests }) {
  const { updateUserData, userData, getSignedState } = useUser();

  const [live, setLive] = useState(false);
  const latestContest = contests[0];

  const [inContest, setInContest] = useState(false);
  const [rankSpectrum, setRankSpectrum] = useState([]);

  useEffect(() => {
    console.log(userData);
    if (userData.name != 'Loading ...') {
      if (latestContest && userData.contests[userData.contests.length - 1] == latestContest.name) setInContest(true);
      if (userData.cRank) {
        if (userData.cRank == 'iron1') setRankSpectrum('iron1', 'iron2', 'iron3', 'bronze1', 'bronze2');
        else {
          const prevRank = (rank) => {
            if (rank == 'iron1') return -1;
            if (rank[rank.length - 1] != '1')
              return rank.substring(0, rank.length - 1) + (parseInt(rank[rank.length - 1]) - 1).toString();
            return codedRanks[codedRanks.indexOf(rank.substring(0, rank.length - 1)) - 1] + '3';
          };
          const nextRank = (rank) => {
            if (rank == 'emerald3') return -1;
            if (rank[rank.length - 1] != '3')
              return rank.substring(0, rank.length - 1) + (parseInt(rank[rank.length - 1]) + 1).toString();
            return codedRanks[codedRanks.indexOf(rank.substring(0, rank.length - 1)) + 1] + '1';
          };
          let unstatefulRankSpectrum = [];
          unstatefulRankSpectrum.push(prevRank(userData.cRank));
          unstatefulRankSpectrum.push(userData.cRank);
          for (let i = 0; i < 3; i++) {
            const toAdd = nextRank(unstatefulRankSpectrum[unstatefulRankSpectrum.length - 1]);
            if (toAdd != -1) unstatefulRankSpectrum.push(toAdd);
            else {
              for (let j = i; j < 3; j++) unstatefulRankSpectrum.shift(prevRank(unstatefulRankSpectrum[0]));
              break;
            }
          }
          console.log(unstatefulRankSpectrum);
          setRankSpectrum(unstatefulRankSpectrum);
        }
      }
    }
  }, [userData]);

  const [timeRemaining, setTimeRemaining] = useState(`99:99:99`);
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    if (
      latestContest &&
      new Date(latestContest.startTime) <= new Date() &&
      new Date(latestContest.endTime) >= new Date()
    ) {
      setLive(true);
    }
  }, []);

  function isTimeBetween() {
    if (!latestContest) return false;
    const currentTime = new Date();
    const startTime = new Date(latestContest.startTime);
    const endTime = new Date(latestContest.endTime);
    return currentTime >= startTime && currentTime <= endTime;
  }

  useEffect(() => {
    if (isTimeBetween()) {
      //if contestTime
      // Update the display every second
      setInterval(updateDisplay, 1000);
    } else {
      setLive(false);
    }
  }, []);

  function getTimeRemaining() {
    const targetDate = new Date(latestContest.endTime);
    const currentDate = new Date();

    const timeRemaining = targetDate - currentDate;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (hours < 0) return false;

    return {
      hours: hours < 10 ? `0${hours}` : hours,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  const [signedState, setSignedState] = useState(false);

  useEffect(() => {
    let go = async () => {
      setSignedState(await getSignedState());
    };
    go();
  });

  function updateDisplay() {
    const time = getTimeRemaining();
    if (time) setTimeRemaining(`${time.hours}:${time.minutes}:${time.seconds}`);
    else setLive(false);
  }

  const onParticipate = async () => {
    setInContest(true);
    onClose();
    await updateUserData({ contests: [...userData.contests, latestContest.name] });
    console.log(userData);
  };

  const getTimezoneName = () => {
    const today = new Date();
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

    // Trying to remove date from the string in a locale-agnostic way
    const shortIndex = full.indexOf(short);
    if (shortIndex >= 0) {
      const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

      // by this time `trimmed` should be the timezone's name with some punctuation -
      // trim it from both sides
      return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
    } else {
      // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
      return full;
    }
  };

  return (
    <NicePage selected='compete' title='Contest Schedule'>
      <div className='h-screen flex flex-col lg:flex-row justify-center items-center '>
        <div className='w-5/6 lg:w-1/2  lg:h-full  flex flex-col justify-center items-center pb-12 '>
          <div className='w-2/3 '>
            <h1 className='robo text-primc text-5xl'>Upcoming Contest Schedule</h1>
            <h3 className='robo text-neutral-400  mt-2 '>
              Visit this page during a contest and solve as many problems from your rank as possible. The more test
              cases you get correct, the higher your chance to promote to the next competitive rank.
            </h3>
            <p className='robo mt-6'>
              Current Time Zone: <span className='text-neutral-300'>{getTimezoneName()}</span>
            </p>
            {live ? (
              <div className='mt-24'>
                <Table data={contests}></Table>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={`lg:flex-1  h-auto   ${!live ? 'lg:mr-24' : ''}  `}>
          {!live ? (
            <Table data={contests}></Table>
          ) : (
            <div className='m-24 bg-backL robo p-12 h-full rounded-md border border-neutral-500'>
              <div className='grid grid-cols-5 grid-rows-1 gap-4'>
                <div className=' col-span-3  flex flex-col justify-center'>
                  <h2 className='font-bold text-primc text-4xl'>
                    {latestContest.name} <span className='text-neutral-200 font-normal'>is Live!</span>{' '}
                  </h2>
                  <h3 className='text-neutral-300 text-xl mt-4'>
                    <span className='text-primc'>Format:</span> {latestContest.description}.
                  </h3>
                  <h3 className='text-neutral-300 text-xl'>
                    <span className='text-primc'>Time Remaining:</span>{' '}
                    {/* {parseInt((new Date(latestContest.endTime) - new Date()) / (1000 * 60))} minutes. */}
                    {timeRemaining}
                  </h3>
                </div>
                {signedState ? (
                  <div className=' col-span-2 flex flex-col justify-center items-center bg-neutral-700 rounded-md py-4 text-sm'>
                    <Image src='/rank-icons/iron.png' width='100' height='100'></Image>
                    <p className='text-neutral-300 text-center '>You will participate in the Iron rank</p>
                  </div>
                ) : (
                  ''
                )}
              </div>

              {!inContest ? (
                signedState ? (
                  <>
                    <button
                      className={` mx-auto w-full px-4 py-2 rounded-md mt-12 ${
                        userData.name == 'Loading ...' ? 'bg-neutral-600 text-neutral-400' : 'bg-primc'
                      } `}
                      onClick={() => {
                        if (userData.name != 'Loading ...') onOpen();
                      }}
                    >
                      Participate
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href='/signin'
                      className='mx-auto w-full px-4 py-2 rounded-md mt-24 bg-primc block text-center robo'
                    >
                      Sign in to participate
                    </Link>
                  </>
                )
              ) : (
                <>
                  <div className='flex flex-col justify-start items-stretch mt-12 gap-4'>
                    {latestContest.problems.map((e, i) => (
                      <Link
                        href={`/contestProblem/${i}`}
                        className='w-full bg-neutral-700 hover:bg-neutral-600 transition-all rounded-md px-4 py-4 flex justify-between'
                      >
                        Problem {i + 1}: {e}
                        <GoLinkExternal className='text-2xl' />
                      </Link>
                    ))}
                  </div>
                  <div className='bg-neutral-700 w-full py-8 rounded-md mt-12 px-4'>
                    <div className='w-full flex justify-evenly'>
                      {rankSpectrum.map((element, index) => (
                        <div className='flex flex-col justify-center' key={index}>
                          <Image src={`/rank-icons/${element}.png`} width='60' height='60' />
                          <span className='text-center'>|</span>
                        </div>
                      ))}
                    </div>
                    <div className='w-full bg-neutral-600 rounded-md  h-4'></div>
                    <p className='text-center  text-neutral-300 mt-6'>Current Rank: Iron 2 (23%)</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {!isOpen ? (
          ''
        ) : (
          <RulesAndInstructions
            isOpen={isOpen}
            onClose={onClose}
            participateButton={true}
            onClick={onParticipate}
          ></RulesAndInstructions>
        )}
      </div>
    </NicePage>
  );
}

export async function getStaticProps() {
  const data = await getUpcomingContests();
  data.sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });
  return {
    props: {
      contests: data,
    },
  };
}


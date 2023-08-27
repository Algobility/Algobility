import { getFilteredPostData, getAllPostIds } from '../../../customStuff/problems';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import NicePage from '../../../components/nicepage';
import { FormControl, FormLabel, Icon, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ranks } from '../../../customStuff/nameMapping';
import { Button } from '@chakra-ui/react';
import { useUser } from '../../../customStuff/useDB';
import { useRouter } from 'next/router';
// import { getTopics } from '../../../customStuff/getTopics';
import Link from 'next/link';
import { GoCircle, GoCheckCircle } from 'react-icons/go';
import { getAllGuides } from '../../../customStuff/guides';
import { GoLinkExternal } from 'react-icons/go';

export default function Search({ probs, rank, topic, chaps }) {
  const [value, setValue] = useState();
  const [rankVal, setRankVal] = useState('loading');
  const [topicVal, setTopicVal] = useState('Any Topic');
  const anytop = ['Any Topic'];
  const [topicsList, setTopicsList] = useState(anytop);
  const [ranksList, setRanksList] = useState(ranks);
  const { userData } = useUser();
  const router = useRouter();

  function replaceFirstOccurrence(arr, searchValue, replaceValue) {
    const index = arr.findIndex((item) => item === searchValue);
    if (index !== -1) {
      const updatedArr = [...arr];
      updatedArr[index] = replaceValue;
      return updatedArr;
    }
    return arr;
  }
  function capitalizeFirstCharacter(str) {
    if (str.length === 0) {
      return str;
    }
    const firstChar = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
    return `${firstChar}${restOfString}`;
  }
  function removeLastCharacter(str) {
    if (str.length === 0) {
      return str;
    }
    return str.slice(0, -1);
  }
  function omitCurrentRank(string) {
    const substring = ' (Current Rank)';

    if (string.endsWith(substring)) {
      return string.slice(0, -substring.length).trim();
    }

    return string;
  }
  function makeFirstCharacterLowercase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  useEffect(() => {
    setRankVal(capitalizeFirstCharacter(rank));
  }, [userData]);

  useEffect(() => {
    async function go() {
      if (rankVal && rankVal != 'loading') {
        const santizedVal = makeFirstCharacterLowercase(omitCurrentRank(rankVal));

        // const res = await getTopics(santizedVal);

        const res = [];
        chaps[santizedVal].forEach((element) => {
          if (element.practicable) res.push(element.title);
        });

        setTopicsList(anytop.concat(res));
      }
    }
    go();
  }, [rankVal]);

  const handleSearch = async () => {
    const routeParam = makeFirstCharacterLowercase(omitCurrentRank(rankVal));
    const topicParam = topicVal == 'Any Topic' ? 'anytopic' : topicVal;
    router.push(`/practice/${routeParam}/${topicParam}`);
  };

  console.log(probs);

  return (
    <NicePage selected='practice' title='Practice'>
      <div className=' w-screen h-screen hidden justify-center items-center '>
        <div className='w-4/5 rounded-md bg-backL p-8'>
          <h1 className='robo text-center text-2xl mb-8 text-primc'>
            Please Use a larger screen size to view this page
          </h1>
          <p className='robo text-center'>
            We apologize for the inconvinence. <br className='mb-2' /> If you are viewing this, expect a mobile version
            to come out within a few days{' '}
          </p>
        </div>
      </div>
      <div className='block min-h-screen h-full mt-32'>
        <div className='w-full flex flex-col justify-start items-center rounded-lg  '>
          <div className='rounded-lg w-3/4 robo py-8 '>
            <h1 className='mont text-5xl md:text-6xl text-primc '>Search Problemset</h1>
            <h2 className='mt-3 text-neutral-300'>
              Practice your implementation skills by solving sample problems. You can find problems from past contests
              here as well.
            </h2>
            <div className='mt-16 flex flex-col gap-4 md:gap-0 md:flex-row justify-center  items-stretch w-full md:px-4 border-b pb-12'>
              <div className=' md:w-1/3 ,md:px-4'>
                <Autocomplete
                  options={ranksList}
                  value={rankVal}
                  onChange={(_, v) => setRankVal(v)}
                  renderInput={(params) => <TextField {...params} label='Rank' className='bg-backL' />}
                />
              </div>
              <div className=' md:w-1/3 md:px-4'>
                <Autocomplete
                  options={topicsList}
                  getOptionDisabled={(option) => option === 'Any Rank'}
                  value={topicVal}
                  onChange={(_, v) => {
                    setTopicVal(v);
                  }}
                  renderInput={(params) => <TextField {...params} label='Topic' className='bg-backL' />}
                />
              </div>
              <div className=' md:w-1/3 md:px-4'>
                <Button onClick={handleSearch} className='bg-primc rounded-md w-full text-left h-full py-4 md:py-0'>
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Change to grid-cols 2 for double column appearance */}
          <div className='grid grid-cols-1 gap-4 w-3/4 mt-12 mb-24 '>
            {probs.map((element, index) => (
              <Link
                href={`/problem/${element.rank}/${element.topic}/${element.id}`}
                key={index}
                className='relative rounded-md bg-neutral-700 hover:bg-neutral-600 transition-all cursor-pointer px-6 py-4 flex justify-start items-center'
              >
                <div className='h-16 w-16 mr-8'>
                  <img src={`/rank-icons/${element.rank}.png`} alt='rank icon' />
                </div>
                <div>
                  <h2 className='robo text-2xl'>{element.title}</h2>
                  <p className='robo'>{element.credits}</p>
                </div>
                <div className='absolute right-12 text-4xl'>
                  <GoLinkExternal />
                </div>
              </Link>
            ))}
            {probs.length == 0 ? (
              <div className='w-full h-24 robo text-center'>
                There are no problems for this topic yet. Check again soon!
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </NicePage>
  );
}

export async function getStaticProps({ params }) {
  getAllPostIds();
  const chaps = await getAllGuides();
  const probs = await getFilteredPostData(params.rank, params.topic);
  console.log(probs[0]);
  console.log(probs[0]);
  console.log(probs[0]);
  return { props: { probs: probs, rank: params.rank, topic: params.topic, chaps: chaps } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

import { getFilteredPostData } from '../../../customStuff/problems';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import NicePage from '../../../components/nicepage';
import { FormControl, FormLabel, Icon, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ranks } from '../../../customStuff/nameMapping';
import { Button } from '@chakra-ui/react';
import { useUser } from '../../../customStuff/useDB';
import { useRouter } from 'next/router';
import { getTopics } from '../../../customStuff/getTopics';
import Link from 'next/link';
import { GoCircle, GoCheckCircle } from 'react-icons/go';

export default function Search({ probs, rank, topic }) {
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
        const res = await getTopics(santizedVal);
        console.log(res);
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

  return (
    <NicePage>
      <div className='md:hidden w-screen h-screen flex justify-center items-center '>
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
      <div className=' min-h-screen h-full mt-32 hidden md:block'>
        <div className='w-full flex flex-col justify-start items-center rounded-lg '>
          <div className='bg-backL rounded-lg w-3/4 robo p-16'>
            <h1 className='jose text-6xl text-primc '>Search Problems</h1>
            <div className='mt-16 flex justify-center  items-stretch w-full px-4 '>
              <div className=' w-1/3 px-4'>
                <Autocomplete
                  options={ranksList}
                  value={rankVal}
                  onChange={(_, v) => setRankVal(v)}
                  renderInput={(params) => <TextField {...params} label='Rank' className='bg-backL' />}
                />
              </div>
              <div className=' w-1/3 px-4'>
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
              <div className=' w-1/3 px-4'>
                <Button onClick={handleSearch} className='bg-primc rounded-md w-full text-left h-full'>
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Change to grid-cols 2 for double column appearance */}
          <div className='grid grid-cols-1 gap-4 w-3/4 mt-12 '>
            {probs.map((element, index) => (
              <Link
                href={`/problem/${element.id}`}
                key={index}
                className='relative rounded-md bg-neutral-700 hover:bg-neutral-600 transition-all cursor-pointer px-6 py-4 flex justify-start items-center'
              >
                <div className='h-16 w-16 mr-8'>
                  <img src={`/rank-icons/${element.rank}.png`} alt='rank icon' />
                </div>
                <div>
                  <h2 className='robo text-2xl'>The Meaning of Life</h2>
                  <p className='robo'>Ahmad Bilal</p>
                </div>
                <div className='absolute right-12 bg-backL rounded-full h-12 w-12'></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </NicePage>
  );
}

export async function getStaticProps({ params }) {
  const probs = await getFilteredPostData(params.rank, params.topic);
  return { props: { probs: probs, rank: params.rank, topic: params.topic } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

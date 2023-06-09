import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import NicePage from '../../components/nicepage';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ranks } from '../../customStuff/nameMapping';
import { Button } from '@chakra-ui/react';
import { useUser } from '../../customStuff/useDB';
import { useRouter } from 'next/router';
import { getTopics } from '../../customStuff/getTopics';
import useRank from '../../customStuff/useRank';

export default function practice() {
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
    useRank(userData, (rank) => {
      setRanksList(replaceFirstOccurrence(ranksList, rank, `${rank} (Current Rank)`));
      setRankVal(`${capitalizeFirstCharacter(userData.pRank)} (Current Rank)`);
    });
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
      <div className=' min-h-screen h-full mt-32'>
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
        </div>
      </div>
    </NicePage>
  );
}

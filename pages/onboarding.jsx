import {
  Card,
  Center,
  SlideFade,
  CardHeader,
  CardBody,
  Icon,
  Input,
  Button,
  Text,
  Image,
  Box,
  useToast,
} from '@chakra-ui/react';
import NicePage from '../components/nicepage';
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import { useEffect, useState } from 'react';
import { TbHexagonNumber1, TbHexagonNumber2 } from 'react-icons/tb';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase from '../firebaseConfig'; //needed
import { queryStorageFieldExists, setStorage } from '../customStuff/useDB';

import { useRouter } from 'next/router';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function onboarding() {
  const toast = useToast();

  /* -------------------------------------------------------------------------- */
  /*                                   Step 1                                   */
  /* -------------------------------------------------------------------------- */

  const [usernameInputValue, setusernameInputValue] = useState('');
  const [isusernameValid, setIsusernameValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isContinueBtnLoading, setIsContinueBtnLoading] = useState(false);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setusernameInputValue(value);
    setIsusernameValid(/^[a-zA-Z0-9_-]+$/.test(value));
    setErrorMessage(
      /^[a-zA-Z0-9_-]+$/.test(value)
        ? ''
        : 'Username can only contain alphanumeric characters, hyphens, and underscores.'
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Step 2                                   */
  /* -------------------------------------------------------------------------- */

  const [selectedRank, setSelectedRank] = useState(1);

  const router = useRouter();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const db = getFirestore(firebase);
  const ranks = [
    {
      id: 1,
      name: 'Iron',
      lowerName: 'iron',
      imageSrc: '/rank-icons/iron2.png',
      description: 'I am completely new to programming and have never done it before.',
    },
    {
      id: 2,
      name: 'Bronze',
      lowerName: 'bronze',
      imageSrc: '/rank-icons/bronze2.png',
      description: `I understand basic programming concepts in my preferred language such as variables, conditions, arrays, functions.`,
    },
    {
      id: 3,
      name: 'Silver',
      lowerName: 'silver',
      imageSrc: '/rank-icons/silver2.png',
      description:
        'I understand intermediate programming concepts such as sorting, nested loops, 2D arrays, and memory management. I am a USACO Bronze Competitor.',
    },
    {
      id: 4,
      name: 'Gold',
      lowerName: 'gold',
      imageSrc: '/rank-icons/gold2.png',
      description:
        'I understand basic data strucutres such as maps, sets, and vectors. I can tackle many basic competitive programming problems which require brute force searching an answer. I am comfortable with recursion to solve a problem via brute force/simulation.',
    },
    // Add more ranks as needed
  ];

  const onSubmit = async () => {
    // Check if username meets the criteria
    if (!isusernameValid || usernameInputValue.trim().length === 0 || usernameInputValue.length > 80) {
      setIsusernameValid(false);
      setErrorMessage(
        'Username must be up to 80 characters and can only contain alphanumeric characters, hyphens, and underscores.'
      );
      toast({
        title: 'Invalid Username.',
        description: 'Please try another username',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    setIsContinueBtnLoading(true);
    //Check if username taken
    const isUsernameTaken = await queryStorageFieldExists('Users', 'username', usernameInputValue);
    if (isUsernameTaken) {
      setIsusernameValid(false);
      setErrorMessage('This username is taken. Please choose another one');
      setIsContinueBtnLoading(false);
      toast({
        title: 'Username Taken.',
        description: 'Please try another username',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    if (!user) {
      toast({
        title: 'Account Onboarding failed.',
        description: 'User not signed in',
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    console.log('slide index is', ranks[selectedRank - 1].lowerName);
    localStorage.removeItem('ud');
    await setStorage('Users', user.uid, {
      username: usernameInputValue,
      pRank: ranks[selectedRank - 1].lowerName,
    })
      .then(() => {
        toast({
          title: 'Account Onboarding Successful.',
          description: `You will be redirected to the dashboard shortly`,
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
        router.push('/dashboard');
      })
      .catch((e) => {
        toast({
          title: 'Account Onboarding failed.',
          description: `If you contact support, tell them this error: ${e.errorMessage}`,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      });

    return;
  };

  return (
    <NicePage className='pt-32 ' title='Onboarding'>
      <div className='flex justify-center mt-32 lg:mx-auto lg:w-2/3 w-full px-8 flex-col gap-4'>
        <h1 className=' text-6xl mont text-center '>Onboarding</h1>
        <h1 className=' mb-12 mont text-center text-neutral-300 text-lg'>
          Welcome to Project A. Get started by entering some account details
        </h1>
        <Card className=' robo mt-8 mx-2 w-full rounded-lg p-8' bg='backL'>
          <CardHeader className='text-3xl font-bold w-full'>
            <div className='flex items-center'>
              <Icon as={TbHexagonNumber1} color='primc' className='mr-4 scale-150'></Icon>
              <h1 className='mont'>Choose a username</h1>
            </div>
            <h2 className='text-base font-normal mt-4 '>You can always change this later</h2>
          </CardHeader>
          <CardBody>
            <div className='w-full flex justify-start items-center mt-6'>
              <span className='mr-2 pb-1'>@</span>
              <Input
                className='py-1 px-3 rounded-md'
                value={usernameInputValue}
                onChange={handleInputChange}
                placeholder='Enter your username'
                variant='flushed'
              />
              <Icon
                as={isusernameValid ? IoIosCheckmarkCircle : IoIosCloseCircle}
                color={isusernameValid ? 'green.500' : 'red.500'}
                className='text-3xl ml-6'
              />
            </div>
            {!isusernameValid && (
              <Text color='red.500' fontSize='sm' mt='2'>
                {errorMessage}
              </Text>
            )}
          </CardBody>
        </Card>
        <Card className=' robo mt-8 p-8 mx-2 w-full  rounded-lg h-full' bg='backL'>
          <CardHeader className='text-3xl font-bold w-full'>
            <div className='flex items-center'>
              <Icon as={TbHexagonNumber2} color='primc' className='mr-4 scale-150'></Icon>
              <h1 className='mont'>Choose a placement rank</h1>
            </div>
            <h2 className='text-base font-normal mt-4 '>
              Choose a rank that best describes your proir knowledge. You will compete in this rank for your first
              contest.
            </h2>
          </CardHeader>
          <CardBody className='mb-12'>
            <div className='flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 mt-12'>
              {ranks.map((rank) => (
                <div
                  key={rank.id}
                  onClick={() => setSelectedRank(rank.id)}
                  className={`  ${
                    rank.id == selectedRank ? 'bg-primc' : 'bg-neutral-700 hover:bg-neutral-600 '
                  } border border-neutral-600 rounded-lg hover:cursor-pointer`}
                >
                  <Box p={4}>
                    <Text mt={2} fontWeight='bold' fontSize='2xl' textAlign='center'>
                      {rank.name}
                    </Text>
                    <Text mt={2} pb={4} textAlign='center'>
                      {rank.description}
                    </Text>
                  </Box>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Button
          isLoading={isContinueBtnLoading}
          className='w-full bg-neutral-700 transition-all mt-12 mb-24 text-center robo py-4 hover:bg-neutral-600 rounded-md'
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </NicePage>
  );
}


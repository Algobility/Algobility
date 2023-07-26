import {
  Box,
  Stack,
  Vstack,
  Heading,
  Button,
  Center,
  Container,
  Flex,
  Card,
  CardHeader,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { getAuth, getUser, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useUser, getStorage, setStorage, existsStorage } from '../customStuff/useDB';
import { useRouter } from 'next/router';

export default function SignUpCard(props) {
  //Init
  const router = useRouter();
  const toast = useToast();
  const auth = getAuth();

  const loginOldUser = async () => {
    console.log('Welcome back, ');
    toast({
      title: 'Account creation Succeeded.',
      description: 'You will be redirected to your dashboard shortly',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
    router.push('/dashboard');
  };

  const onboardNewUser = async (user) => {
    console.log('Welcome to Project A, ' + user.displayName + '!');

    await setStorage(
      'Users',
      user.uid,
      {
        name: user.displayName,
        email: user.email,
        handle: `Please-change-your-handle-${user.email}`,
        pRank: `unranked`,
        cRank: `unranked`,
      },
      false
    );

    // await setDoc(
    //   doc(db, 'Users', user.uid),
    //   {
    //     name: user.displayName,
    //     email: user.email,
    //     handle: `Please-change-your-handle-${user.email}`,
    //     pRank: `unranked`,
    //   },
    //   { merge: true }
    // );

    router.push('/onboarding');
  };

  const postSignin = async (credCallback) => {
    return async (result) => {
      const credential = credCallback(result);
      const token = credential.accessToken;
      const user = result.user;

      const UserExists = await existsStorage('User', user.uid);

      console.log('User Exists returned ', UserExists);

      if (!UserExists) await onboardNewUser(user);
      else await loginOldUser();
    };
  };

  const signIn = (providerName) => {
    return async () => {
      if (!auth) console.log('Auth undefined :(');
      var provider;
      var credCallback;
      switch (providerName) {
        case 'Google':
          credCallback = GoogleAuthProvider.credentialFromResult;
          provider = new GoogleAuthProvider();
          break;
        case 'Github':
          credCallback = GithubAuthProvider.credentialFromResult;
          provider = new GithubAuthProvider();
          break;
        default:
          console.log('BRAIHDbsalkd');
          break;
      }

      provider.setCustomParameters({
        login_hint: 'user@example.com',
      });
      await signInWithPopup(auth, provider)
        .then(await postSignin(credCallback))
        .catch(handleMe());
    };
  };

  const errorToast = (title, msg) => {
    toast({
      title: 'Account creation failed.',
      description: msg,
      status: 'error',
      duration: 6000,
      isClosable: true,
    });
  };

  const handleMe = () => {
    return (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      var displayError;
      switch (errorMessage) {
        case 'auth/account-exists-with-different-credential':
          displayError = `You have already signed up using a different authentication provider. Please sign in with that authentication provider`;
          break;

        case 'auth/cancelled-popup-request':
          displayError = `Popup was closed`;
          return;
          break;

        case 'Firebase: Error (auth/cancelled-popup-request)':
          displayError = `Popup was closed`;
          return;
          break;

        case 'Firebase: Error (auth/popup-closed-by-user)':
          displayError = `Popup was closed`;
          return;
          break;

        default:
          console.log(`uncaught error: ${error}`);
          displayError = `If you contact support, tell them this error code: ${errorMessage}`;
          break;
      }
      errorToast('Account creation failed.', displayError);
    };
  };
  return (
    // <div className=' lighten w-2/3 md:w-1/3 rounded-lg '>
    //   <Card bg='transparent' rounded='lg' shadow='xl' className='sep w-full md:full ' color='chita'>
    //     <CardHeader>
    //       <Heading color='prim.500' fontFamily='Oswald' mb='2'>
    //         SIGN UP / LOG IN
    //       </Heading>
    //       <Heading fontSize='sm' mb='4'>
    //         Sign in with an account by choosing an authentication provider
    //       </Heading>
    //     </CardHeader>
    //     <Button mx='5' className='robo bg-neutral-700' leftIcon={<FcGoogle />} onClick={signIn('Google')}>
    //       Continue with Google
    //     </Button>
    //     <Button className='robo bg-neutral-700' my='4' mx='5' leftIcon={<FaGithub />} onClick={signIn('Github')}>
    //       Continue with Github
    //     </Button>
    //   </Card>
    // </div>
    <div class='lighten w-2/3 md:w-1/3 rounded-lg'>
      <div class='bg-transparent rounded-lg shadow-xl sep w-full md:full text-chita'>
        <div class='p-5'>
          <h1 class='text-primc robo text-4xl mb-2'>SIGN IN</h1>
          <h2 class='text-md mb-4 robo'>
            If you haven't created a Project A account before, one will automatically be created for you
          </h2>
        </div>
        <div className='flex flex-col justify-center gap-3 mb-6'>
          <button
            class='robo bg-neutral-700 mx-5 flex justify-center items-center py-2 rounded-md hover:bg-neutral-600'
            onClick={signIn('Google')}
          >
            <span class='mr-2'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 1024 1024'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z'></path>
              </svg>
            </span>
            <p>Continue with Google</p>
          </button>
          <button
            class='robo bg-neutral-700 mx-5 flex justify-center items-center py-2 rounded-md hover:bg-neutral-600'
            onClick={signIn('Github')}
          >
            <span class='mr-2'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 1024 1024'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z'></path>
              </svg>
            </span>
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  );
}

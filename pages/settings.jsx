import { Input } from '@mui/material';
import NicePage from '../components/nicepage';
import { useUser } from '../customStuff/useDB';
import { useEffect, useState } from 'react';
import { StepDescription, Toast, useToast } from '@chakra-ui/react';

export default function Settings() {
  const { userData } = useUser();
  const [username, setUsername] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    setUsername(userData.username);
    setName(userData.name);
  }, [userData]);

  const toast = useToast();
  return (
    <NicePage>
      <div className=' min-h-screen w-full border border-transparent px-24'>
        <div className='mt-44  pb-12 border-b-2 border-neutral-500 '>
          <h1 className='mont text-6xl '>Preferences</h1>
          <h2 className='mont mt-2'>Manage account settings and preferences</h2>
        </div>
        <div className='mb-24 mt-24 text-xl flex flex-col gap-4 bg-backL rounded-md p-6 '>
          <div className='flex justify-start gap-4'>
            <div className='robo '>Username: </div>
            <div className='flex justify-start gap-1 items-start'>
              @
              <Input
                value={username}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUsername(e.target.value);
                }}
                className=''
              ></Input>
            </div>
          </div>
          <div className='flex justify-start gap-4'>
            <div className='robo '>Display Name: </div>
            <div className='flex justify-start gap-1 items-center'>
              <Input
                value={name}
                onChange={(e) => {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
                className='px-2'
              ></Input>
            </div>
          </div>
        </div>
        <button
          className='bg-primc px-4 py-2 rounded-md robo hover:bg-opacity-60'
          onClick={() => {
            toast({
              title: 'Failed to upload data',
              description: 'Something went wrong on our side. We apologize for the inconvenience',
              status: 'error',
              isClosable: true,
              duration: 6500,
            });
          }}
        >
          Save Changes
        </button>
      </div>
    </NicePage>
  );
}

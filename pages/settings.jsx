import { Input } from '@mui/material';
import NicePage from '../components/nicepage';
import { useUser } from '../customStuff/useDB';

export default function Settings() {
  const { userData } = useUser();
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
              @<Input defaultValue={userData.username} className=''></Input>
            </div>
          </div>
          <div className='flex justify-start gap-4'>
            <div className='robo '>Display Name: </div>
            <div className='flex justify-start gap-1 items-center'>
              <Input defaultValue={userData.name} className='px-2'></Input>
            </div>
          </div>
        </div>
        <button className='bg-primc px-4 py-2 rounded-md robo hover:bg-opacity-60'>Save Changes</button>
      </div>
    </NicePage>
  );
}

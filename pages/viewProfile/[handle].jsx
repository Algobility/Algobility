import { useEffect, useState } from 'react';
import NicePage from '../../components/nicepage';
import { getStorage, queryUser } from '../../customStuff/useDB';
import Image from 'next/image';
import { pretty } from '../../customStuff/nameMapping';

export default function viewProfile() {
  const [targetUserData, setTargetUserData] = useState({
    name: 'Loading ...',
    username: 'Loading ...',
    email: 'Loading ...',
    pRank: 'Loading ...',
    cRank: 'loading',
    completed: [],
  });

  useEffect(() => {
    const go = async () => {
      queryUser('testa')
        .then((e) => {
          setTargetUserData(e);
        })
        .catch((e) => {
          console.log('no bro', e);
        });
    };
    go();
  }, []);
  return (
    <NicePage>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-3/4 bg-backL rounded-xl p-14'>
          <div className=' flex justify-start'>
            <Image src={`/rank-icons/${targetUserData.cRank}.png`} width='200' height='200'></Image>
            <div className='flex flex-col justify-center ml-4'>
              <h1 className='text-6xl mont'>{targetUserData.name}</h1>
              <h2 className='text-3xl mont text-neutral-500'>@{targetUserData.username}</h2>
            </div>
          </div>
          <h2 className='text-2xl mont mt-12'>Recent Competitions</h2>
          <div className='h-64 border robo mt-3 rounded-md p-8'>
            <p className='italic text-neutral-600 '>No recent competitions</p>
          </div>
        </div>
      </div>
    </NicePage>
  );
}

// export async function getStaticProps({ params }) {
//   //   const targetUserData = await queryUser(params.handle);
//   return { props: { targetUserData: 'hi' } };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// }

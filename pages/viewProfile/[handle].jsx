import { useEffect, useState } from 'react';
import NicePage from '../../components/nicepage';
import { getStorage, queryUser } from '../../customStuff/useDB';
import Image from 'next/image';
import { pretty } from '../../customStuff/nameMapping';

export default function viewProfile({ targetUserData }) {
  return (
    <NicePage>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-3/4 rounded-xl p-14 text-neutral-300'>
          <div className=' flex justify-start items-center'>
            <div>
              <Image src={`/rank-icons/${targetUserData.cRank}.png`} width='150' height='150'></Image>
              <p className='text-center mont'>{pretty(targetUserData.cRank)}</p>
            </div>
            <div className='flex flex-col justify-center ml-8 '>
              <h1 className='text-6xl mont'>{targetUserData.name}</h1>
              <h2 className='text-3xl mont text-neutral-500'>@{targetUserData.username}</h2>
            </div>
          </div>
          <h2 className='text-2xl mont mt-24 border-b mb-4'>Recent Competitions</h2>
          <div className='h-64 robo mt-3 rounded-md'>
            <p className='italic text-neutral-600 '>No recent competitions</p>
          </div>
        </div>
      </div>
    </NicePage>
  );
}

export async function getStaticProps({ params }) {
  const targetUserData = await queryUser(params.handle);
  return { props: { targetUserData: targetUserData } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

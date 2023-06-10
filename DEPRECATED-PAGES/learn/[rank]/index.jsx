// import { useEffect, useState } from 'react';
// import NicePage from '../../components/nicepage';
// import { useUser } from '../../customStuff/useDB';
// import useRank from '../../customStuff/useRank';
// import DropdownMenu from '../../components/Menu';
// import { getChapters, getTopics } from '../../customStuff/getTopics';
// import Link from 'next/link';
// import { getGuides } from '../../customStuff/guides';

// export default function LearnIndex() {
//   const { userData } = useUser();
//   const [rank, setRank] = useState('loading');
//   const [chaps, setChaps] = useState();
//   // const router = useRouter();
//   useEffect(() => {
//     useRank(userData, (newRank) => {
//       setRank(newRank);
//     });
//   }, [userData]);

//   useEffect(() => {
//     if (rank != 'loading') {
//     }
//   }, [rank]);

//   return (
//     <NicePage>
//       <div className='mt-32 min-h-screen--32 relative'>
//         <p className='pt-10 mont text-6xl text-primc text-center'>Welcome to the Training Grounds</p>
//         <div className='mb-24 pt-4 mont text-2xl  text-center'>Get Started by choosing a chapter</div>
//         <div className='flex justify-center items-start w-full'>
//           <div className='grid grid-cols-1 gap-4 w-3/4 mt-12  '>
//             {chaps
//               ? chaps.map((element, index) => (
//                   <Link
//                     href={`/problem/${element.id}`}
//                     key={index}
//                     className='relative rounded-md bg-neutral-700 hover:bg-neutral-600 transition-all cursor-pointer px-6 py-4 flex justify-start items-center'
//                   >
//                     <div className='h-16 w-16 mr-8'>
//                       <img src={`/rank-icons/${element.rank}.png`} alt='rank icon' />
//                     </div>
//                     <div>
//                       <h2 className='robo text-2xl'>The Meaning of Life</h2>
//                       <p className='robo'>Ahmad Bilal</p>
//                     </div>
//                     <div className='absolute right-12 bg-backL rounded-full h-12 w-12'></div>
//                   </Link>
//                 ))
//               : ''}
//           </div>
//         </div>
//         <div className=' bottom-8 absolute  w-full robo rounded-md flex justify-center items-center gap-2'>
//           <div className='bg-neutral-700 px-4 py-2 rounded-md flex justify-center items-center gap-3 big-shadow'>
//             <span>Viewing Chapters of</span>
//             <DropdownMenu defaultValue={rank}></DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </NicePage>
//   );
// }

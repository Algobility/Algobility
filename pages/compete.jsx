import NicePage from '../components/nicepage';
import { getAllContests } from '../customStuff/contest';
import Table from '../components/table';

export default function Compete({ contests }) {
  console.log(contests);
  return (
    <NicePage selected='compete' title='Contest Schedule'>
      <div className='h-screen flex justify-center items-center '>
        <div className='w-1/2 h-full  flex flex-col justify-center items-center'>
          <div className='w-2/3'>
            <h1 className='robo text-primc text-5xl'>Contest Schedule</h1>
            <h3 className='robo text-neutral-400  mt-2'>
              Contests are held every few days at specific times. They contain 2-4 problems. Solve the problems during
              the contest time and get as many test cases correct as possible to promote to the next rank.
            </h3>
            <h3 className='robo text-neutral-200 text-lg mt-6'>
              There is no need to sign up for a contest in advance. Simply view this page during the contest time and
              click participate to join a contest
            </h3>
            {/* <h3 className='robo text-neutral-200  mt-6'>Once a contest is live, click on it to participate</h3> */}
          </div>
        </div>
        <div className='flex-1 pr-24'>
          <Table data={contests}></Table>
        </div>
        {/* <div className='flex-1 flex flex-col justify-start gap-6 pr-24'>
          {contests.map((e, index) => (
            <div key='index' className='bg-neutral-700 py-4 px-8 border-neutral-600 rounded-md robo'>
              <div className='flex justify-start items-center robo'>
                <div>
                  <h2 className='text-lg'>{e.name}</h2>
                  <h2 className='text-neutral-400 text-lg'>{e.description}</h2>
                </div>
                <h2 className='text-lg text-right flex-1'>{e.name}</h2>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </NicePage>
  );
}

export async function getStaticProps() {
  const data = await getAllContests();
  data.sort((a, b) => {
    return a.startTime > b.startTime ? 1 : -1;
  });
  return {
    props: {
      contests: data,
    },
  };
}

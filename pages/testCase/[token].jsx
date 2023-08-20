import NicePage from '../../components/nicepage';

function MockWindow(props) {
  return (
    <div className='bg-backL rounded-lg'>
      <div className='w-full rounded-t-lg bg-neutral-700 flex justify-start px-6 py-4 border-b'>
        <p className='mono'>{props.heading}</p>
        <div className='flex-1 flex justify-end'>
          <div>🔴</div>
          <div>🟡</div>
          <div>🟢</div>
        </div>
      </div>
      <div className='p-6 mono'>{props.text ? Buffer.from(props.text.toString(), 'base64').toString('utf-8') : ''}</div>
    </div>
  );
}

export default function testCase({ ans }) {
  console.log(ans);
  const obj = ans.submissions[0];
  return (
    <NicePage title='Test Case Details'>
      <div className='mt-32 h-full'>
        <div
          className={`text-center robo text-4xl ${
            obj.status.description == 'Accepted' ? 'text-green-700' : 'text-red-500'
          } `}
        >
          {obj.status.description}
        </div>
        <div className={`text-center robo mt-3 text-neutral-400`}>Time taken: {obj.time}s</div>
        <div className={`text-center robo  text-neutral-400`}>Memory used: {obj.memory}kb</div>
        <div className='w-full h-2/3  mt-24 grid grid-cols-3 px-24 gap-24'>
          <MockWindow heading='compiler_output' text={obj.compile_output}></MockWindow>
          <MockWindow heading='stdout' text={obj.stdout}></MockWindow>
          <MockWindow heading='stderr' text={obj.stderr}></MockWindow>
        </div>
      </div>
    </NicePage>
  );
}

export async function getStaticProps({ params }) {
  const API_IP = `34.136.231.150`;
  const API_URL = `http://${API_IP}:2358`;

  const result = await fetch(`${API_URL}/submissions/batch?tokens=${params.token}&base64_encoded=true`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authn: 'frfrnocap',
    },
  }).then((res) => res.json());

  return {
    props: {
      ans: result,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

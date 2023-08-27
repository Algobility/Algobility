import NicePage from '../components/nicepage';

export default function ServerError(props) {
  console.log(props);
  return (
    <NicePage>
      <div className='h-screen flex flex-col justify-center items-center robo text-center p-8'>
        <h1 className='robo text-4xl'>Server Error</h1>
        <h2 className='mt-2'>
          Our server (actually a single rasperry pi) seems to have encountered an error. The CPU must have fallen off
          again.
          <br />
          Please stand by as our single unpaid worker attempts to solder the CPU back into place.
        </h2>
        <h3 className='mt-8 text-neutral-400 italic'>Tip: Try reloading this page. It might fix something.</h3>
      </div>
    </NicePage>
  );
}

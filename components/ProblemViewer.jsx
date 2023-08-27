import MdxRenderer from './MdxRenderer';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function ProblemViewer(props) {
  return (
    <div className='h-full min-h-screen mt-24  pr-24 pl-14 py-10 mb-24 w-full relative '>
      <Link href={props.backLink} className='w-full mt-4 text-lg robo hover:underline cursor-pointer '>
        <ArrowBackIcon /> Back to all questions
      </Link>
      <div className=' border-neutral-300  border-b pb-6 mb-32 mt-12'>
        <h1 className='mont text-6xl mb-4 text-primc flex justify-start items-center'> {props.postData.title}</h1>
        <h2 className='mont '>
          {' '}
          Time Constraint: <strong> {props.postData.time} second(s)</strong>
        </h2>
        <h2 className='mont '>
          Memory Constraint: <strong> {props.postData.mem} mb</strong>
        </h2>
        <h2 className='mont '>
          Credits:<strong> {props.postData.credits}</strong>
        </h2>
      </div>
      <MdxRenderer mdxSource={props.postData.contentHtml} problem />
    </div>
  );
}

import { Button } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import html from 'remark-html';
import { remark } from 'remark';

export default function Exercise({ question, answer, number }) {
  const [viewAns, setViewAns] = useState(false);
  const [qText, setqText] = useState(question);
  const [aText, setaText] = useState(answer);

  useEffect(() => {
    const go = async () => {
      const processedContent = await remark().use(html).process(question);
      setqText(processedContent.toString());
      const processedAns = await remark().use(html).process(answer);
      setaText(processedAns.toString());
    };
    go();
  }, []);

  return (
    <div className='mt-24 mb-32 w-full'>
      <div
        className={`w-full bg-neutral-700 shadow-xl rounded-t-md rounded-br-md robo rounded-md
        `}
      >
        <div className='w-full rounded-t-md bg-primc flex justify-between items-center px-8 py-4 '>
          <span className='font-bold'>Exercise {number}</span>
          <span className='italic '> Try solving this problem before continuing further </span>{' '}
        </div>
        <div className={`w-full relative   `}>
          <div className='p-8' id='ExerciseMdWrapper' dangerouslySetInnerHTML={{ __html: qText }}></div>
          {viewAns ? (
            <>
              <div className='p-8 bg-neutral-600 rounded-md'>
                <div className='w-full' id='ExerciseMdWrapper' dangerouslySetInnerHTML={{ __html: aText }}></div>
              </div>
            </>
          ) : (
            <div className='w-full flex justify-center items-center  my-4 pb-8  '>
              <div
                className='w-full mx-8 py-2 text-center  bg-neutral-600 rounded-md hover:bg-primc hover:border-primc hover:cursor-pointer transition-all'
                onClick={() => {
                  setViewAns(true);
                }}
              >
                View Answer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                   Collapsable Version (Currently Broken)                   */
/* -------------------------------------------------------------------------- */

// export default function Exercise({ question, answer, number }) {
//   const [isOverflowing, setIsOverflowing] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [qText, setqText] = useState(question);
//   const ref = useRef(null);
//   console.log(isOverflowing);

//   useEffect(() => {
//     const go = async () => {
//       const processedContent = await remark().use(html).process(question);
//       setqText(processedContent.toString());
//     };
//     go();
//   }, []);

//   useEffect(() => {
//     if (ref.current) {
//       const element = ref.current;
//       setIsOverflowing(element.scrollHeight > element.clientHeight);
//     }
//   }, []);

//   const handleToggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className='mt-24 mb-32 w-full'>
//       <div
//         className={`w-full bg-neutral-700 shadow-xl rounded-t-md rounded-br-md robo  ${
//           isOverflowing ? '' : 'rounded-md'
//         }`}
//       >
//         <div className='w-full rounded-t-md bg-primc flex justify-between items-center px-8 py-4 '>
//           <span className='font-bold'>Exercise {number}</span>
//           <span className='italic '> Try solving this problem before continuing further </span>{' '}
//         </div>
//         <div ref={ref} className={`w-full relative ${isExpanded ? '' : 'h-96'} `}>
//           <div className='p-8 border' id='ExerciseMdWrapper' dangerouslySetInnerHTML={{ __html: qText }}></div>
//           <div className='w-full flex justify-center items-center h-8  my-4'>
//             <div className='w-10/12 h-full text-center  border rounded-md'>View Answer</div>
//           </div>
//         </div>
//       </div>
//       <Button
//         className={` ${
//           isOverflowing ? '' : 'hidden'
//         } px-8 absolute  rounded-b-md  shadow bg-neutral-600 hover:px-12 mt- transition-all robo py-2  `}
//         onClick={handleToggleExpand}
//         rightIcon={
//           isOverflowing ? (
//             !isExpanded ? (
//               <svg
//                 stroke='currentColor'
//                 fill='currentColor'
//                 strokeWidth='0'
//                 viewBox='0 0 1024 1024'
//                 height='1em'
//                 width='1em'
//                 xmlns='http://www.w3.org/2000/svg'
//               >
//                 <path d='M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z'></path>
//               </svg>
//             ) : (
//               <svg
//                 stroke='currentColor'
//                 fill='currentColor'
//                 strokeWidth='0'
//                 viewBox='0 0 1024 1024'
//                 height='1em'
//                 width='1em'
//                 xmlns='http://www.w3.org/2000/svg'
//               >
//                 <path d='M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z'></path>
//               </svg>
//             )
//           ) : (
//             ''
//           )
//         }
//       >
//         {isExpanded ? 'Collapse' : 'Expand'}
//       </Button>
//     </div>
//   );
// }

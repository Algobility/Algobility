import { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Exercise from './Exercise';
import ExerciseQuestion from './ExerciseQuestion';
import ExerciseAnswer from './ExerciseAnswer';
import Solution from './Solution';
import Code from './code';
import { MathJax } from 'better-react-mathjax';

function removeTrailingWhite(input) {
  console.log('UEAJJEKLAJDLKASDklj ad;lkjaslk;d jsakl;j');
  console.log(input.charAt(0));
  if (input.charAt(0) === ' ') {
    return input.substring(1);
  } else {
    return input;
  }
}

export default function MdxRenderer({ mdxSource }) {
  const components = useMemo(
    () => ({
      h1: (props) => <h1 className='text-4xl font-bold mt-20 robo' {...props} />,
      h2: (props) => <h2 className='font-bold mt-6 robo text-2xl' {...props} />,
      p: (props) => <p className='robo mt-4 text-lg text-neutral-300' {...props} />,
      strong: (props) => <span className='text-primc font-semibold' {...props} />,
      a: (props) => <a className='robo !text-primc mt-4 text-lg hover:underline ' {...props} />,
      pre: (props) => <pre className='rounded-lg p-8 my-6' style={{ 'background-color': '#2B2B2B' }} {...props} />,
      code: (props) => <Code {...props} codeClass='mt-2 rounded-md py-0.5 px-2 bg-backL' children={props.children} />,
      Figure: (props) => (
        <img
          {...props}
          className={`rounded-md  mx-auto outline my-12 ${props.classExtensions}`}
          children={props.children}
        />
      ),
      Exercise: (props) => <Exercise {...props} />,
      ExerciseQuestion: (props) => <ExerciseQuestion {...props} />,
      ExerciseAnswer: (props) => <ExerciseAnswer {...props} />,
      Solution: (props) => <Solution {...props} />,
      Math: (props) => (
        <MathJax
          inline={!props.block}
          className={props.block ? 'my-4 mx-auto w-full text-center' : ''}
          children={props.block ? `${'$$'}${props.children}${'$$'}` : `${'\\( '}${props.children}${'\\) '}`}
        ></MathJax>
      ),
      li: (props) => <li className='mt-2  robo ml-8  text-lg' {...props} />,
      ul: (props) => <ul className='mt-4 robo list-disc  text-lg' {...props} />,
      ol: (props) => <ul className='mt-4 robo list-decimal  text-lg' {...props} />,
    }),
    []
  );
  return <MDXRemote {...mdxSource} components={components} />;
}


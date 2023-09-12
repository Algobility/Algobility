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

const MdxRenderer = ({ mdxSource }) => {
  const components = useMemo(
    () => ({
      h1: (props) => <h1 className='text-4xl font-bold mt-20 robo' {...props} />,
      h2: (props) => <h2 className='font-bold mt-6 robo text-2xl' {...props} />,
      p: (props) => <p className='robo mt-4 text-lg text-neutral-300' {...props} />,
      a: (props) => <a className='robo text-primc mt-4 text-lg' {...props} />,
      pre: (props) => <pre {...props} />,
      code: (props) => <Code {...props} codeClass='mt-2 rounded-md py-0.5 px-2 bg-backL' children={props.children} />,
      Exercise: (props) => <Exercise {...props} />,
      ExerciseQuestion: (props) => <ExerciseQuestion {...props} />,
      ExerciseAnswer: (props) => <ExerciseAnswer {...props} />,
      Solution: (props) => <Solution {...props} />,
      Math: (props) => (
        <MathJax
          inline={!props.block}
          className={props.block ? 'text-2xl my-4' : ''}
          children={`${'\\('}${props.children}${'\\)'}`}
        ></MathJax>
      ),
      // Code: (props) => <Code {...props} />,
      li: (props) => <li className='mt-2  robo ml-8 ' {...props} />,
      ul: (props) => <ul className='mt-4 robo list-disc ' {...props} />,
      ol: (props) => <ul className='mt-4 robo list-decimal ' {...props} />,
    }),
    []
  );
  return <MDXRemote {...mdxSource} components={components} />;
};

export default MdxRenderer;

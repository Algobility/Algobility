import { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Exercise from './Exercise';
import ExerciseQuestion from './ExerciseQuestion';
import ExerciseAnswer from './ExerciseAnswer';
import Solution from './Solution';
import Code from './code';
import { MathJax } from 'better-react-mathjax';

function removeTrailingWhite(input) {
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
      pre: (props) => <pre className='my-6 bg-backL py-6 rounded-md px-6  border-neutral-400' {...props} />,
      code: (props) => (
        <Code className='mt-2 rounded-md py-0.5 bg-backL px-2' children={removeTrailingWhite(props.children)} />
      ),
      Exercise: (props) => <Exercise {...props} />,
      ExerciseQuestion: (props) => <ExerciseQuestion {...props} />,
      ExerciseAnswer: (props) => <ExerciseAnswer {...props} />,
      Solution: (props) => <Solution {...props} />,
      Math: (props) => <MathJax {...props}></MathJax>,
      // Code: (props) => <Code {...props} />,
      li: (props) => <li className='mt-2  robo ml-8 ' {...props} />,
      ul: (props) => <ul className='mt-4 robo list-disc ' {...props} />,
    }),
    []
  );
  return <MDXRemote {...mdxSource} components={components} />;
};

export default MdxRenderer;

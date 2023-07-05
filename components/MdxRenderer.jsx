import { useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Exercise from './Exercise';

const MdxRenderer = ({ mdxSource }) => {
  const components = useMemo(
    () => ({
      h1: (props) => <h1 className='text-2xl font-bold mt-12 robo underline' {...props} />,
      h2: (props) => <h2 className='font-bold mt-6 robo text-lg' {...props} />,
      p: (props) => <p className='robo mt-4 text-lg' {...props} />,
      pre: (props) => <pre className='mt-3 bg-backL py-2 rounded-md px-4 border border-neutral-400' {...props} />,
      code: (props) => <code className='mt-2 rounded-md bg-backL px-2 py-1' {...props} />,
      Exercise: (props) => <Exercise {...props} />,
    }),
    []
  );

  return <MDXRemote {...mdxSource} components={components} />;
};

export default MdxRenderer;

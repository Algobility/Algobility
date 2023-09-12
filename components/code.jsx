import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function Code({ children, codeClass, className }) {
  if (className) {
    return (
      <SyntaxHighlighter
        language={className.slice(9)}
        children={children}
        className={codeClass + ' !px-8 !py-8 !my-6'}
        style={a11yDark}
      ></SyntaxHighlighter>
    );
  }
  return <code children={children} className={codeClass}></code>;
}

import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { remark } from 'remark';
import Exercise from './Exercise';

const ParsedContentWrapper = ({ text }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const go = async () => {
      // Parse the raw HTML and find the component placeholders
      const parsedHtml = new DOMParser().parseFromString(text, 'text/html');
      const componentPlaceholders = parsedHtml.querySelectorAll('[data-component]');

      // Replace the component placeholders with actual components
      componentPlaceholders.forEach(async (placeholder) => {
        const componentName = placeholder.dataset.component;
        const componentProps = JSON.parse(placeholder.dataset.props);

        // Create the actual component instance based on the component name
        let componentInstance;

        if (componentName === 'CustomComponent') {
          componentInstance = (
            <div id='hydrateMe'>
              <Exercise {...componentProps} />
            </div>
          );
          const componentHtml = ReactDOMServer.renderToString(componentInstance);
          placeholder.outerHTML = componentHtml;
          contentRef.current.innerHTML = parsedHtml.body.innerHTML;
          console.log(componentHtml);
        } else {
          contentRef.current.innerHTML = parsedHtml.body.innerHTML;
        }
      });
      // Set the modified HTML content
    };
    go();
  }, []);

  return <div id='ProblemMdWrapper' ref={contentRef} />;
};

export default ParsedContentWrapper;

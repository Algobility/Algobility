import MdxRenderer from '../components/MdxRenderer';
import ProblemViewer from '../components/ProblemViewer';
import NicePage from '../components/nicepage';

export default function Test(props) {
  return (
    <NicePage>
      <div className='flex justify-start  w-3/4'>
        <ProblemViewer
          postData={{
            id: 'GameShowSpinner',
            rank: 'iron',
            topic: 'Loops',
            contentHtml: {
              compiledSource:
                '/*@jsxRuntime automatic @jsxImportSource react*/\nconst {Fragment: _Fragment, jsxDEV: _jsxDEV} = arguments[0];\nconst {useMDXComponents: _provideComponents} = arguments[0];\nfunction _createMdxContent(props) {\n  const _components = Object.assign({\n    p: "p",\n    h1: "h1",\n    pre: "pre",\n    code: "code"\n  }, _provideComponents(), props.components), {Solution} = _components;\n  if (!Solution) _missingMdxReference("Solution", true, "28:1-53:12");\n  return _jsxDEV(_Fragment, {\n    children: [_jsxDEV(_components.p, {\n      children: "A new episode of a popular game show is being recorded. Contestants play the game one at a time and compete for a single grand prize. There are 3 spinners, each divided into two sections: \\"WIN\\" and \\"LOSE\\". A contestant wins the prize if all three spinners land on \\"WIN\\" every time they are spun. Each of the 3 spinners is spun 3 times. Write a program that calculates the percent chance a contestant can win the prize given the \\"chance\\" value of each spinner."\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 2,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.h1, {\n      children: "Input Format"\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 4,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.p, {\n      children: "The input consists of one line, containing three space-separated float values representing the \\"chance\\" values of the spinners. Each input value is in the inclusive range of 0 to 1."\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 6,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.h1, {\n      children: "Output Format"\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 8,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.p, {\n      children: "Output a float value representing the percent chance a contestant can win the prize. The output may be zero (0.0)"\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 10,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.h1, {\n      children: "Sample Test Case - Input"\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 12,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.pre, {\n      children: _jsxDEV(_components.code, {\n        children: "0.4 0.9 0.999\\n"\n      }, undefined, false, {\n        fileName: "<source.js>",\n        lineNumber: 14,\n        columnNumber: 1\n      }, this)\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 14,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.h1, {\n      children: "Sample Test Case - Output"\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 19,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.pre, {\n      children: _jsxDEV(_components.code, {\n        children: "0.046516\\n"\n      }, undefined, false, {\n        fileName: "<source.js>",\n        lineNumber: 20,\n        columnNumber: 1\n      }, this)\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 20,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(_components.h1, {\n      children: "Solution"\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 26,\n      columnNumber: 1\n    }, this), "\\n", _jsxDEV(Solution, {\n      children: _jsxDEV(_components.pre, {\n        children: _jsxDEV(_components.code, {\n          className: "language-cpp",\n          children: "#include <bits/stdc++.h>\\r\\n\\r\\nusing namespace std;\\r\\n\\r\\nint main() {\\r\\n    int numTestCases;\\r\\n    cin >> numTestCases;\\r\\n\\r\\n    for (int i = 0; i < numTestCases; ++i) {\\r\\n        float spinner1, spinner2, spinner3;\\r\\n        cin >> spinner1 >> spinner2 >> spinner3;\\r\\n\\r\\n        float spinner1Chance = spinner1*spinner1*spinner1;\\r\\n        float spinner2Chance = spinner2*spinner2*spinner2;\\r\\n        float spinner3Chance = spinner3*spinner3*spinner3;\\r\\n\\r\\n\\r\\n        double winChance = spinner1Chance * spinner2Chance * spinner3Chance * 100.0;\\r\\n        cout << winChance << endl;\\r\\n    }\\r\\n\\r\\n}\\n"\n        }, undefined, false, {\n          fileName: "<source.js>",\n          lineNumber: 29,\n          columnNumber: 1\n        }, this)\n      }, undefined, false, {\n        fileName: "<source.js>",\n        lineNumber: 29,\n        columnNumber: 1\n      }, this)\n    }, undefined, false, {\n      fileName: "<source.js>",\n      lineNumber: 28,\n      columnNumber: 1\n    }, this)]\n  }, undefined, true, {\n    fileName: "<source.js>",\n    lineNumber: 1,\n    columnNumber: 1\n  }, this);\n}\nfunction MDXContent(props = {}) {\n  const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);\n  return MDXLayout ? _jsxDEV(MDXLayout, Object.assign({}, props, {\n    children: _jsxDEV(_createMdxContent, props, undefined, false, {\n      fileName: "<source.js>"\n    }, this)\n  }), undefined, false, {\n    fileName: "<source.js>"\n  }, this) : _createMdxContent(props);\n}\nreturn {\n  default: MDXContent\n};\nfunction _missingMdxReference(id, component, place) {\n  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\\nIt’s referenced in your code at `" + place + "`" : ""));\n}\n',
              frontmatter: {},
              scope: {},
            },
            title: 'Game Show Spinner',
            date: '2023-08-25',
            credits: 'Saleh Syed',
            time: 1,
            mem: 156,
            tcIn: [
              '0.4 0.9 0.999',
              '0.01 0.1 0.01',
              '0.00001 0.00001 0.00001',
              '1 1 1',
              '1 0 1',
              '0 0.56 0.9',
              '0.5 0.5 0',
              '0.445 0.673 0.218',
            ],
            tcOut: [0.046516, 0, 0, 100, 0, 0, 0, 0.000278],
          }}
          backLink={`/practice/$dasd/anytopic`}
        ></ProblemViewer>
      </div>
    </NicePage>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {},
  };
}

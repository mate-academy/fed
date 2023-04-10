const rule = require('./no-window-outside-use-effect');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-window-outside-use-effect', rule, {
  valid: [
    // window used inside useEffect
    {
      code: `
        import { useEffect } from 'react';

        function MyComponent() {
          useEffect(() => {
            window.alert('Hello, world!');
          }, []);
        
          return null;
        }
      `,
    },
    // window not used
    {
      code: `
        import React from 'react';

        function MyComponent() {
          return <div>Hello, world!</div>;
        }
      `,
    },
  ],

  invalid: [
    // window used outside useEffect
    {
      code: `
        import React from 'react';

        function MyComponent() {
          window.alert('Hello, world!');

          return null;
        }
      `,
      errors: [
        {
          message: 'Using the window object outside of useEffect is not allowed',
        },
      ],
    },
    // window used in nested function
    {
      code: `
        import { useEffect } from 'react';

        function MyComponent() {
          function handleClick() {
            window.alert('Hello, world!');
          }

          useEffect(() => {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
          }, []);

          return null;
        }
      `,
      errors: [
        {
          message: 'Using the window object outside of useEffect is not allowed',
        },
      ],
    },
    {
      code: `
        import { useEffect } from 'react';

        function MyComponent() {
          const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

          useEffect(() => {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
          }, []);

          return null;
        }
      `,
      errors: [
        {
          message: 'Using the window object outside of useEffect is not allowed',
        },
      ],
    },
  ],
});

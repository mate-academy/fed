const { RuleTester } = require('eslint');

const rule = require('./no-window-outside-useeffect');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run('no-window-outside-useeffect', rule, {
  valid: [
    {
      code: 'useEffect(() => { window.alert("Hello World"); }, []);'
    },
    {
      code: 'useEffect(() => { const foo = () => { console.log("Hello World"); }; foo(); }, []);'
    },
    {
      code: 'const [size, setSize] = useState([0, 0]); const useEffect(() => { setSize([window.innerWidth, window.innerHeight]);}, []);'
    },
  ],
  invalid: [
    {
      code: 'window.alert("Hello World");',
      errors: [{ message: 'Do not use window outside of a useEffect hook' }]
    },
    {
      code: 'const foo = () => { console.log(window.innerWidth); };',
      errors: [{ message: 'Do not use window outside of a useEffect hook' }]
    },
    {
      code: 'const [size, setSize] = useState([window.innerWidth, window.innerHeight]);',
      errors: [{ message: 'Do not use window outside of a useEffect hook' }]
    }
  ]
});

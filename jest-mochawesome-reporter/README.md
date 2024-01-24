# `@mate-academy/jest-mochawesome-reporter` npm package

## Description

This package is a reporter for Jest that generates a report in mochawesome compatible JSON format. You can use it with [mochawesome](https://www.npmjs.com/package/mochawesome) to show a fancy report in HTML format.

## Install
- `npm i -D @mate-academy/jest-mochawesome-reporter`

## Usage
- add `@mate-academy/jest-mochawesome-reporter` to `jest.config.js`:

```js
module.exports = {
  ...
  reporters: [
    'default', // to see console output
    '@mate-academy/jest-mochawesome-reporter'
  ],
  ...
};
```
- configuration is optional, default values:

```js
module.exports = {
  ...
  reporters: [
    'default',
    [
      '@mate-academy/jest-mochawesome-reporter',
      {
        outputDir: '<globalConfig.rootDir>', // rootDir from jest.config.js
        outputName: 'jest-mochawesome',
        createDirIfMissing: false,
      },
    ],
  ],
  ...
};
```


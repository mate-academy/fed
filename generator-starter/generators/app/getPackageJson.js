const path = require("path");

module.exports = () => {
  return {
    name: process.cwd().split(path.sep).pop(),
    version: "1.0.0",
    description: "",
    main: "index.js",
    repo: "",
    keywords: [],
    author: "",
    license: "ISC",

    scripts: {
      "postinstall": "npm run copy:editor-config && npm run copy:htmllint-config",
      "copy:editor-config": "cp node_modules/@mate-academy/editor-config/.editorconfig ./.editorconfig",
      "copy:htmllint-config": "cp node_modules/@mate-academy/htmllint-config/.htmllintrc ./.htmllintrc",
      "validate:html": "foreach -g ./src/**/*.html --no-c -x \"html-validator --file #{path} --format=gnu --verbose\"",
      "lint:html": "htmllint ./src/**/*.html",
      "lint:css": "stylelint ./src/**/*.css",
      "lint:js": "eslint ./src/**/*.js",
      "start": "browser-sync start --config browser-sync.config.js",
      "test": "npm run lint:html && npm run lint:css && npm run validate:html",
      "test:lighthouse": "lighthouse --view  --verbose"
    },

    devDependencies: {
      "husky": "^1.3.1",
      "browser-sync": "^2.26.3",
      "eslint": "^5.13.0",
      "htmllint-cli": "0.0.7",
      "lighthouse": "^4.1.0",
      "stylelint": "^9.10.1",
      "foreach-cli": "^1.8.1",
      "html-validator-cli": "^5.0.0",
      "@mate-academy/stylelint-config": "latest",
      "@mate-academy/htmllint-config": "latest",
      "@mate-academy/editor-config": "latest",
      "@mate-academy/eslint-config": "latest"
    },

    "husky": {
      "hooks": {
        "pre-push": "npm test"
      }
    }
  };
};

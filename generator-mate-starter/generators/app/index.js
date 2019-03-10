'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the finest ${chalk.red('mate-starter')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;
    // });
  }

  writing() {
    this.fs.copy(
      this.templatePath(),
      this.destinationRoot(),
      {globOptions: {dot: true}}
    );

    this.fs.writeJSON(this.destinationPath("package.json"), {
      name: process.cwd().split(path.sep).pop(),
      version: "1.0.0",
      description: "",
      main: "index.js",
      repo: "",
      keywords: [],
      author: "",
      license: "ISC",

      // configure run script defaults
      scripts: {
        "postinstall": "npm run copy:editorconfig && npm run copy:htmllint-config",
        "copy:editorconfig": "cp node_modules/@mate-academy/fed-editor-config/.editorconfig $INIT_CWD",
        "copy:htmllint-config": "cp node_modules/@mate-academy/fed-htmllint-config/.htmllintrc $INIT_CWD",
        "lint:html": "htmllint ./src/**/*.html",
        "lint:css": "stylelint ./src/**/*.css",
        "lint:js": "eslint ./src/**/*.js",
        "start": "browser-sync start --config browser-sync.js",
        "start:tunnel": "browser-sync start --config browser-sync-config.js --tunnel",
        "test": "npm run lint:html && npm run lint:css && npm run lint:js",
        "test:lighthouse": "lighthouse --output html --view"
      },

      devDependencies: {
        "browser-sync": "^2.26.3",
        "eslint": "^5.13.0",
        "htmllint-cli": "0.0.7",
        "lighthouse": "^4.1.0",
        "stylelint": "^9.10.1",
        "@mate-academy/fed-stylelint-config": "latest",
        "@mate-academy/fed-htmllint-config": "latest",
        "@mate-academy/fed-editor-config": "latest",
        "@mate-academy/fed-eslint-config": "latest"
      }
    });
  }

  install() {
    this.npmInstall();
  }
};

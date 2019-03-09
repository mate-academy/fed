'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
  }

  install() {
    // this.installDependencies();
  }

  initializing() {
    this.composeWith(require.resolve('generator-npm-init/app'), {
      // skip prompts
      'skip-name': true,
      'skip-description': true,
      'skip-version': true,
      'skip-main': true,
      'skip-test': true,
      'skip-repo': true,
      'skip-keywords': true,
      'skip-author': true,
      'skip-license': true,

      // supply alternative defaults
      name: '<%= destFolderName %>',
      version: '1.0.0',
      description: '',
      main: 'index.js',
      repo: '',
      keywords: [],
      author: '',
      license: 'ISC',

      // configure run script defaults
      scripts: {
        "lint:html": "htmllint ./src/**/*.html",
        "lint:css": "stylelint ./src/**/*.css",
        "_lint:js": "eslint ./public/**/*.js",
        "start": "browser-sync start --config browser-sync.js",
        "start:tunnel": "browser-sync start --config bs-config.js --tunnel",
        "test": "npm run lint:html && npm run lint:css",
        "test:lighthouse": "lighthouse --output html --view"
      },

      devDependencies: {
        "browser-sync": "^2.26.3",
        "eslint": "^5.13.0",
        "htmllint-cli": "0.0.7",
        "lighthouse": "^4.1.0",
        "stylelint": "^9.10.1"
      }
    });
  }
};

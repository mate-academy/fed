'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require("path");
const getPackageJson = require("getPackageJson");

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

    this.fs.writeJSON(this.destinationPath("package.json"), getPackageJson());
  }

  install() {
    this.npmInstall();
  }
};

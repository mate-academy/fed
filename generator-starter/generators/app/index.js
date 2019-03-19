'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const getPackageJson = require("./getPackageJson");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the finest ${chalk.red("@mate-academy/starter")} generator!`)
    );
  }

  writing() {
    this.spawnCommandSync("git", ["init"]);

    this.fs.copy(
      this.templatePath(),
      this.destinationRoot(),
      {globOptions: {dot: true}}
    );

    this.fs.writeJSON(this.destinationPath("package.json"), getPackageJson());

    // ref: https://github.com/yeoman/generator/issues/812
    this.fs.move(this.destinationPath("_gitignore"), this.destinationPath(".gitignore"));
  }

  install() {
    this.npmInstall();
  }
};

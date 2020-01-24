'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the neat ${chalk.red('generator-deploy-tf-spec')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'plan_name',
        message: 'Enter display name for your project'
      },
      {
        type: 'input',
        name: 'project_key',
        message: 'Enter bamboo project key (e.g. LDM,CTP,MMSYS)',
        store: true
      },
      {
        type: 'input',
        name: 'plan_key',
        message: 'Enter bamboo plan key (e.g. TERRADEPLOY)'
      },
      {
        type: 'input',
        name: 'access_key_id',
        message: 'Enter AWS Access Key ID as Spec Encrypted variable (e.g. BAMSRCT@0@0@0XXXXXX)'
      },
      {
        type: 'input',
        name: 'secret_access_key',
        message: 'Enter AWS Secret Key as Spec Encrypted variable (e.g. BAMSRCT@0@0@0XXXXX)'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('bamboo-specs/bamboo.yml'),
      this.destinationPath('bamboo-specs/bamboo.yml'),
      {
        project_key = this.props.project_key,
        plan_key = this.props.plan_key,
        plan_name = this.props.plan_name,
        access_key_id = this.props.access_key_id,
        secret_access_key = this.props.secret_access_key
      }
    );
  }

  install() {
    this.installDependencies();
  }
};

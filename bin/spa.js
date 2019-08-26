#! /usr/bin/env node

const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
program
  .version(require('../package').version)
  .usage('<command> [options]')
program
  .command('init <app-name>').description('create a new project powered by vue-cli-service')

if (program.init) {
  const spinner = ora('正在从github下载spa-cli').start();
  download('https://gitlab.aihaisi.com/teams/frontend/vue-template-cli.git#qqs_add_cli_190826', program.init, function (err) {
    if (!err) {
      // 可以输出一些项目成功的信息
      console.info(chalk.blueBright('下载成功'));
      fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
        if (err) throw err;
        let _data = JSON.parse(data.toString())
        _data.name = program.init
        _data.version = '1.0.0'
        let str = JSON.stringify(_data, null, 4);
        fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
          if (err) throw err;
        })
      });
    } else {
      // 可以输出一些项目失败的信息
    }
  })
}



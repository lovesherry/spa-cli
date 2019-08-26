#! /usr/bin/env node

const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path')
program
  .version('0.1.0')
  .option('-i, init [name]', '初始化x-build项目')
  .parse(process.argv);


if (program.init) {
  let spinner = ora('正在从github下载spa-cli').start();
  download('direct:https://gitlab.aihaisi.com/teams/frontend/vue-template-cli.git#qqs_add_cli_190826', program.init, { clone: true }, function (err) {
    spinner.stop()
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
        // spinner = ora('正在安装依赖').start();
        let spawnObj = spawn('npm', ['install'], { cwd: path.join(process.cwd(), program.init), stdio: 'inherit' })
        spawnObj.on('close', function (code) {
          if (code === 0) {
            spawnObj = spawn('npm', ['run', 'serve'], { cwd: path.join(process.cwd(), program.init), stdio: 'inherit' })
          }
        })
      });
    } else {
      // 可以输出一些项目失败的信息
      //console.log(err)
    }
  })

}



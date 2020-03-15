//这个文件是专门用来处理命令行的
import * as commander from 'commander'
import { translate } from './main';

const program = new commander.Command();

program
  .version('0.0.2')
  .name('fy')
  .usage('<english>') //<english>尖括号必填，[options]方括号选填
  .arguments('<english>')
  .action((english) => {
    console.log('<english>')
    console.log(english)
    translate(english)
  })

console.log('process.argv')
console.log(process.argv)
program.parse(process.argv) //对用户输入命令时传进来的参数解析
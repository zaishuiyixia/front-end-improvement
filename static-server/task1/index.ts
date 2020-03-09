import * as http from "http"
import * as fs from 'fs'
import * as p from 'path'

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public') //__dirname表示当前文件所在的路径，p.relative(__dirname, 'public')表示public所在的绝对路径

server.on('request', (request, response) => { //监听请求事件
  const { method, url, headers } = request;
  switch (url) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8') //设置返回的文件类型
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => { //data是一个Buffer，要给他变成string
        if (error) throw error; //throw error之后不会向下执行
        response.end(data.toString());
      })
      break;
    case '/style.css':
      response.setHeader('Content-Type', 'text/css; charset=utf-8') //设置返回的文件类型
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => { //data是一个Buffer，要给他变成string
        if (error) throw error; //throw error之后不会向下执行
        response.end(data.toString());
      })
      break;
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8') //设置返回的文件类型
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => { //data是一个Buffer，要给他变成string
        if (error) throw error; //throw error之后不会向下执行
        response.end(data.toString());
      })
      break;
    default:
      response.statusCode = 404
      response.end()
  }
})

server.listen(8888, () => {
  console.log(server.address())
})
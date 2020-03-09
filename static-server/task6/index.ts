import * as http from "http"
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url'

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public') //__dirname表示当前文件所在的路径，p.relative(__dirname, 'public')表示public所在的绝对路径
let cacheAge = 3600 * 24 * 365;

server.on('request', (request, response) => { //监听请求事件
  console.log('有人请求了')
  const { method, url: path, headers } = request;
  if (method !== 'GET') {

    response.statusCode = 405; //不接受POST请求
    response.end();
    return

    // 或者接受POST请求，给一个假的响应

    // response.statusCode = 200
    // response.setHeader('Content-Type', 'text/html; charset=utf-8') //设置返回的文件类型
    // response.end('这是一个假的响应')
    // return
  }
  console.log('path')
  console.log(path)
  const object = url.parse(path);
  console.log('object')
  console.log(object)
  const { pathname, search } = object;
  const filename = pathname.substr(1) ? pathname.substr(1) : 'index.html';

  fs.readFile(p.resolve(publicDir, filename), (error, data) => { //data是一个Buffer，要给他变成string
    if (error) {
      console.log('error')
      console.log(error)
      if (error) {
        response.statusCode = 404
        // response.setHeader('Content-Type', 'text/html; charset=utf-8') //设置返回的文件类型
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data)
        })
      }
    } else {
      //返回文件内容
      response.setHeader('Cache-Control', `public, max-age=${cacheAge}`)
      response.end(data);
    }
  })
})

server.listen(8888, () => {
  console.log(server.address())
})
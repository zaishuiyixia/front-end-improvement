import * as http from "http"
const server = http.createServer(); //

server.on('request', (request, response) => { //监听请求事件
  console.log('有人请求了')
  console.log('request.method')
  console.log(request.method)
  console.log('request.url')
  console.log(request.url)
  console.log('request.httpVersion')
  console.log(request.httpVersion) //http版本
  console.log('request.url')
  console.log(request.url)
  console.log('request.headers')
  console.log(request.headers)

  const array = [];
  request.on('data', (chunk) => { //获取消息体
    array.push(chunk)
  })
  request.on('end', () => { // 拼接消息体
    console.log('array')
    console.log(array)
    const body = Buffer.concat(array).toString();
    console.log('body')
    console.log(body)
    response.end('hi') //把请求结束掉
  })

})

server.listen(8888, () => {
  console.log(server.address())
})
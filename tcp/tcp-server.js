var net = require('net')
var util = require('util')
var fs = require('fs')

var fileOut = fs.createWriteStream('./tcp.txt');

//创建方法  1
/*var server = net.createServer(function (socket) {
    console.log('connected');
})*/

//创建方法2

var server = net.createServer();
server.on('connection',function (socket) {

    console.log(socket.remoteAddress);

    console.log('connected');
    // socket是一个duplex 流，可读可写流
    socket.setEncoding('utf8');

    //借助 pipe 将数据写入到文件
    socket.pipe(fileOut,{end:false}) ;

    socket.on('data',function(chunk){

        console.log(chunk);

        socket.write('server get msg = ' + chunk);
    })

    socket.on('end',function () {
        console.log('end')
    })

    socket.on('error',function () {

        console.log('error');
        socket.destroy();
    })
});

setTimeout(function(){
    server.unref();
},1000)

server.listen(8080) ;
//连接  telnet  、xshell等  ' telnet 127.0.0.1 8080 '






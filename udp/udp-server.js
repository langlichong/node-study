var dgram = require('dgram')

var server = dgram.createSocket('udp4')

server.bind(41234,'localhost');

server.on('listening',function () {

    var addr = server.address() ;
    console.dir('server start listen,address is :' + addr.toString());
    
})

//当客户端发送消息是
server.on('message',function (msg,remoteInfo) {
    console.log(msg.toString());
    console.dir(remoteInfo);

    server.send(new Buffer('珠峰培训'),3,6,remoteInfo.port,remoteInfo.address);
})

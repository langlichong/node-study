var dgram = require('dgram')

var client = dgram.createSocket('udp4');

client.send(new Buffer('珠峰培训'),3,6,41234,'127.0.0.1');


//当服务端端发送消息是
client.on('message',function (msg,remoteInfo) {
    console.log(msg.toString());
    console.dir(remoteInfo);

    client.send(new Buffer('珠峰培训'),3,6,remoteInfo.port,remoteInfo.address);
})

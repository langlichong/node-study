
var net = require('net');
var util = require('util')

var socket = new net.Socket();
socket.setEncoding('utf8');
socket.connect(8080,'localhost',function(){

    console.log(socket.remoteAddress,socket.remotePort);

    socket.write('hi ,i am client ');
})

// 监听服务器返回消息
socket.on('data',function (data) {
    console.log('msg from server : ' + data)
})

// 客户端主动关闭
setTimeout(function() {

    socket.end();
},1000);

/**
 * websocket
 * 1、基于事件的，与node的事件基本一致
 * 2、实现了服务器和客户端的长连接
 * 优势：
 * 1、只建立一个tcp连接
 * 2、可以相互推送数据
 * 3、更轻量级，减少数据传输量（相对与http而言）
 * 4、双工协议通信
 * 握手：
 *
 */


var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({port:8080});

wss.on('connection',function (ws) {

    ws.on('message',function (messages) {

        console.log('received msg : %s',messages);
        ws.send('server hello');
    });
});




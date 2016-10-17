var path = require('path');

var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

io.on('connection',function (socket) {
    console.log('user has connected !');
    socket.on('disconnect',function () {
        console.log('client disconnect');
    });

    socket.on('message',function (message) {
        console.log('msg from client : %s',message);
        socket.send('hi client');
    });
});

app.get('/',function (req, res) {
    require('fs').createReadStream('./1.html').pipe(res);
});

server.listen(80);

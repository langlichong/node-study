var WebSocket = require('ws');

var client = new WebSocket('ws://localhost:8080');

client.on('open',function () {
   
    client.send('connection coming...');
});

client.on('message',function (data) {

    console.log(data.toString());

});

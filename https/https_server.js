
var https = require('https');

var fs = require('fs') ;

var options = {
    key:fs.readdirSync('./server/server.key') ,
    cert:fs.readFileSync('./server/server.crt')
};

https.createServer(function(req,res){

    res.end('hello');

}).listen(8080);

var express = require('express');

//静态资源中间件
var serverStatic = require('serve-static');

var fs = require('fs');

var app = express();

app.use('/img',serverStatic(__dirname+'/img'));

app.get('/',function (req,res) {
    fs.createReadStream('./index.html').pipe(res);
});

app.listen(8080);

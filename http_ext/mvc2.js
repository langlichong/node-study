/**
 * 手工配置
 *
 */
var http = require('http');
var util = require('util');
var url = require('url');


http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname ;
    var paths = pathname.split('/');
    var controller = paths[1];
    var oper = paths[2];
    var args = paths.slice(3);





}).listen(8080);
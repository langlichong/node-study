/**
 * MVC如何实现Controller
 * 1、自然约定  无路由（大多是文件夹路径配置）
 *      e.g  /user/add  请求则对应相应的文件夹路径： d:\node\http_ext\user\add.js  (add.js里有各种操作)
 * 2、手工指定
 */
var http = require('http');
var util = require('util');
var url = require('url');

/**
 * 基于约定的方式，url如下：
 * localhost:8080/user/add
 * localhost:8080/user/delete
 */
http.createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname ;
    var paths = pathname.split('/');
    var controller = paths[1];
    var oper = paths[2];
    var args = paths.slice(3);

    var route = require('.'+pathname);




}).listen(8080);

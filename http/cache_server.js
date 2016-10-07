/**
 * node中如何实现缓存
 * 缓存策略：
 * 1、expire  设置一个key为Expires的header值
 *   是一个GMT格式的字符串，浏览器接收到此串后，只要本地有这个文件，到期之前不发请求
 *   当Expires 与 Cache-Control同时存在时，后者会覆盖前者，即缓存过期时间以后者为准
 *
 */

var fs = require('fs');
var http = require('http');

http.createServer(function (req,res) {

    // 1.txt
    var filename = req.url.slice(1);
    expireHandler(filename,req,res); // 方式1
    matchHandler(filename,req,res); // 方式2
    eTagHandler(filename,req,res) ; //方式3

}).listen(8080);

function expireHandler(filename, req, res) {

    fs.readFile(filename,function (err, content) {

        var expireTime = new Date(new Date().getTime() + 30*1000);
        res.setHeader('Expires',expireTime.toUTCString());  // http1.0 支持
        res.setHeader('Cache-Control','Max-Age=60')  // 缓存策略   http1.1 支持
        res.writeHead(200,'ok');
        res.end(content);
    })
}

/**
 * 1、第一次响应的时候，服务器会返回给客户端一个Last-Modified header  ，即最后修改时间
 * 2、当客户端再次需要请求该文件时，会把这个时间发给服务器——if-modified-since
 * 3、服务器判断，如果修改过文件则返回最新的，如果没修改过则返回 304 表示没修改
 */
function matchHandler(filename, req, res) {

    var lastModified = new Date(req.headers['if-modified-since']) ;
    fs.stat(filename,function(err,stat){

        if(err)
            throw  Error(err);

        /**
         * 以文件的最后修改时间做缓存依据，不够好，因为只能精确到秒级别的比较
         * 修改时间改了，内容不一定修改了，内容变了才是真的变了
         * 使用 etag 来解决，其原理如下：
         *      1、第一次时候，服务器会把此文件生成一个etag，并发给客户端（header方式），其key为ETag
         *      2、再次请求的时候，客户端将该etag传给服务器，其key为 if-none-match
         *      3、服务器判断，相同则返回304，否则返回最新文件
         */
        if(Math.floor(stat.mtime.getTime()/1000) == Math.floor(lastModified.getTime()/1000)){
            res.statusCode = 304 ;
            res.end('');
        }else{
            res.setHeader('Last-Modified',stat.mtime.toUTCString());
            res.writeHead(200,'ok');
            res.createReadStream(filename).pipe(res);

        }
    })
}


function eTagHandler(filename, req, res) {

    fs.readFile(filename,function (err, content) {

        var hash = getHash(content);
        var match = req.headers['if-none-match'] ;

        if(hash == match){
            res.statusCode = 304 ;
            res.end('');
        }else{
            res.setHeader('ETag',hash);
            res.writeHead(200,'ok');
            res.createReadStream(filename).pipe(res);
        }

    });
}

var crypto = require('crypto');  //
function getHash(content) {

    return crypto.createHash('sha1').update(content).digest('hex');

}
/**
 * 静态文件服务器
 */

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

var config = require('./config');

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname ;
    if(pathname.slice(-1) == '/'){
        pathname += 'index.html' ;
    }

    var realPath = path.join('public',pathname);
    var ext = path.extname(realPath);  // 扩展名
    //检测请求资源后缀是否在缓存列表
    if(ext.match(config.CachedType.fileMatch)){
        fs.stat(realPath,function (err,stat) {
            var lastModified = stat.mtime.toUTCString() ;
            if(req.headers['if-modified-since'] && req.headers['if-modified-since'] == lastModified){
                res.writeHead(304);
                res.end(http.STATUS_CODES[304]);
            }else{
                var expire = new Date(new Date().getTime() + config.CachedType.maxAge*1000);
                // 为了兼容新老版本需设置两个过期时间header
                res.setHeader('Expires',expire.toUTCString());
                res.setHeader('Cache-Control','max-age='+config.CachedType.maxAge);
                res.setHeader('LastModified',lastModified);

                res.writeHead(200,{'Content-Type':mime.lookup(realPath)})
                fs.createReadStream(realPath).pipe(res) ;
            }
        })
    }else{
        res.writeHead(200,{'Content-Type':mime.lookup(realPath)})
        fs.createReadStream(realPath).pipe(res) ;
    }

}).listen(8080);

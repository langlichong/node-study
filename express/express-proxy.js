/**
 * Node 实现代理  http-proxy
 */

var express = require('express');
var url = require('url');
var httpProxy = require('http-proxy');

var forwarded = require('forwarded');

/**
 * 通过host实现多个网站共用一个端口
 * 通过请求头中host来区分不同主机
 * host文件：
 * 127.0.0.1  zfpx.baidu.com
 * 127.0.0.1  zfpx.taobao.com
 * 127.0.0.1  zfpx.qq.com
 */
var app = express();

function proxyPass(host,target) {
    //构建一个代理服务器
    var proxy = httpProxy.createProxyServer();
    proxy.on('proxyReq',function (proxyReq, req, res, options) {
        var tarHost = url.parse(target).host ;
        proxyReq.setHeader('Host',tarHost);
        proxyReq.setHeader('X-Real-IP',forwarded(req));
    });
    
    proxy.on('proxyRes',function (proxyRes, req, res) {
        res.setHeader('X-Proxy-By','node.js'); //指定是谁代理的
    });
    
    return function (req,res,next) {
        var currHost = req.headers.host.split(':')[0];
        if(currHost == host){
            proxy.web(req,res,{
                target:target
            });
        }else{
            next();
        }
    }
}
app.use(proxyPass('zfpx.baidu.com','http://www.baidu.com'));  // 将zfpx.baidu.com 代理到百度
app.use(proxyPass('zfpx.taobao.com','http://www.taobao.com'));
app.use(proxyPass('zfpx.qq.com','http://www.qq.com'));


app.listen(8080,'localhost');

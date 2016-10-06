/**
 * Created by wuwangwo on 2016/10/3.
 */

var http = require('http');
var fs = require('fs') // 读取文件模块

var mime = require('mime')


/*// verstion 1   : deal with eahc resource request

/!*http.createServer(function(req,res){

    var url = req.url ; // 以斜杠开始的服务器端的资源路径，不包含主机及端口，如,http://localhost:80  则得到斜杠‘/’

    //获取查询字符串
    var urls = url.split('?');
    var pathName = urls[0] ;
    var qStr = urls[1] ;

    console.log(url) ;
    console.log('pathName = ' + pathName + ", qStr="+qStr);

    // 向客户端返回一个html，利用fs读取index.html
    if(pathName == '/index.html'){

        var content = fs.readFileSync('./index.html');

        res.end(content.toString().replace("<%=type%>",qStr));

    }else if(pathName == '/style.css'){ // 返回资源时候，需要指定mime类型，否则可能浏览器可以正确解析，但会发出警告

        res.setHeader('Content-type','css');

        var content = fs.readFileSync('./style.css');
        res.end(content);

    }else if(pathName == '/test.jpg'){ // 返回资源时候，需要指定mime类型，否则可能浏览器可以正确解析，但会发出警告

        res.setHeader('Content-type','image/jpg');

        var content = fs.readFileSync('./test.jpg');
        res.end(content);

    }else{
        res.end('404')
    }

}).listen(80)*!/*/


http.createServer(function(req,res){

    var url = req.url ; // 以斜杠开始的服务器端的资源路径，不包含主机及端口，如,http://localhost:80  则得到斜杠‘/’

    //获取查询字符串
    var urls = url.split('?');
    var pathName = urls[0] ;
    var qStr = urls[1] ;

    console.log(url) ;
    console.log('pathName = ' + pathName + ", qStr="+qStr);

    var isExist = fs.existsSync('.'+pathName);
    if(isExist){

        res.setHeader('Content-Type',mime.lookup(pathName));

        var content = fs.readFileSync('.'+pathName) ;

        res.end(content) ;

    }else{
        res.end('404') ;
    }


    // 向客户端返回一个html，利用fs读取index.html
    if(pathName == '/index.html'){

        var content = fs.readFileSync('./index.html');


    }else{
        res.end('404')
    }

}).listen(80)


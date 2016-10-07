/**
 * cookie ： 是服务器发送给客户端的一小段文本（是一种解决http无状态的方案，用于跟踪客户端）
 * 1、服务器发给客户端的key为Set-Cookie的header
 * 2、客户端以key-value的形式保存（内存或硬盘）
 * 3、以后的每一次请求，客户端会有选择的（注意有选择的）将保存的cookie发送给服务器(出现在请求头中)
 *
 * cookie目的：让服务器能够在多个http请求之间跟踪客户端
 * cookie 本质就是一个header的值:
 *   1. 他的key是固定的就是：Set-Cookie
 *   2. 分隔符是分号加空格 name=zw; age=18
 *
 *   在chrome里的resource标签页中可以看cookie属性：
 *   Name
 *   Value
 *   Domain   - 指定cookie被发送到哪些服务器上
 *   Path     - 控制哪些路径可以发送cookie，默认是斜杠 '/'(表示对此域名下所有路径都可以发送)
 *   Expires/Max-Age  (一般取值为Session-表示存放在浏览器内存里-内存级别cookie，关闭浏览器就销毁),可以通过Max-Age设置时间
 *   Http（HttpOnly）  - 该属性表示只能在http里面看到，不能通过(js)document.cookie访问（可以在chrome的console中尝试）
 *   设置cookie的标准格式：
 *      name=ze; path=/; domain=localhost;
 */

var url = require('url');
var http = require('http');
var parse = require('./parse');

//node 提供的cookie模块  serialize({name:'tom',age:123,path:'/'})将对象转为字符串
var cookieUrils = require('cookieUrils') ;

http.createServer(function (req, res) {

    parse(req); // 自定义

    var pathname = req.pathname ;

    if(pathname == '/favicon.ico'){
        res.end('404');
    }else if(pathname == '/write'){ // 写cookie

        // 以下设置了3个cookie,若分为多条语句则会因key相同而覆盖
        res.setHeader('Set-Cookie',['name=zfpx; age=6; gender=man; HttpOnly; Max-Age=60']); // 多个cookie可使用数组

        res.end(JSON.stringify(res.headers));
    }else if(pathname == '/read'){

       res.end(req.headers.cookie);

    }else{
        res.end('404');
    }

}).listen(8080);



















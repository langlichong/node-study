/**
 * Authentication 认证
 * basic认证：
 * 客户端请求时，服务器要求客户端输入用户及密码，之后服务器验证，通过继续访问，失败则返回401-未授权
 * 成功后每次访问都会自动提供用户名密码
 */

var http = require('http');

http.createServer(function (req, res) {

    function send401() {

        //要求认证的key是定好的
        res.setHeader('WWW-Authenticate','Basic realm="Secure Area"');
        res.writeHead(401);
        res.end();


    }

    var auth = req.headers['authorization'];  // 认证信息会放到authorization里面
    if(auth){

        var auths = auth.split(' ');
        var method = auths[0] ;
        var encoded = auths[1];
        var decoded = new Buffer(encoded,'base64').toString('utf8').split(":");

        if(decoded[0] == decoded[1]){

            res.end('ok');
        }else{
            send401();
        }

        res.end();
    }else{

        send401();
    }
}).listen(8080);


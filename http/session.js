/**
 * session  服务器端的一端内存
 *
 */

var http = require('http');
var uril = require('util');
var cookieUtils = require('cookieutils');
var parse = require('./parse');

var SESSION_KEY = 'SessionKey' ;  //约定一个key
var EXPIRES_TIME = 1000*10 ;  // 单位秒

var session = {} ;

http.createServer(function (req, res) {

    parse(req);

    var now = Date.now() ;
    if(req.pathname == '/favicon.ico'){

    }else if(req.pathname == ''){

    }else{
        var cookieObj = cookieUtils.parse(req.cookie);
        if(cookieObj[SESSION_KEY]){  // cookie 中有SESSION_KEY
            res.end(JSON.stringify(req.cookie));
        }else{
            var sessionObj = {
                mny:100,expTime:new Date(now + EXPIRES_TIME)
            }
            var sesssionId = now + '_' + Math.random() ;

            session[sesssionId] = sessionObj ;

            res.writeHead(200,{
                'Content-Type':'text/html;charset=utf8',
                'Set-Cookie':cookieUtils.serialize(SESSION_KEY,sesssionId)
            })
            res.end('ok');
        }
    }

}).listen(8080)

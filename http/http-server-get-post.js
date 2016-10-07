
var http = require('http') ;

var fs = require('fs');
var path = require('path');

var util = require('util');
var url = require('url');

var querystring = require('querystring');


var server = http.createServer();

server.on('request',function(req,res){
    // 注意此处的request到来时是还没有对请求体进行解析 只有请求行请求头信息
    // 对于get请求，请求本身也是没有请求体（body）的，更不存在解析的情况
    //注意post请求处理

    //设置请求编码
   // req.setEncoding('utf8');

    var urlObj = url.parse(req.url,false);
    console.dir(urlObj);

    var pathname = urlObj.pathname ;

    if(pathname == '/'){
        fs.createReadStream('./form.html').pipe(res)
    }else if(pathname == '/get'){
        //  /get?username=23&email=23&提交=提交查询
        var obj = querystring.parse(urlObj.query) ; // 该方法可以将字符串转换为对象
        console.dir(obj);
        //设置响应编码
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
        res.end(JSON.stringify(obj));

    }else if(pathname == '/post'){

        var resStr = '' ;
        req.on('data',function(chunk){
            resStr += chunk ;
        });
        
        req.on('end',function () {

            var obj = querystring.parse(resStr) ; // 该方法可以将字符串转换为对象
            //设置响应编码
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'})
            res.end(JSON.stringify(obj));
        })

    }else if(pathname == '/file'){
        // 文件上传时候，由于v8引擎有内存有限制，64位系统最多好像是1.4G大小

        // 保存文件上传请求
        // 请求中有一个边界用于分割每个字段  可以通过浏览器查看生成的boundary，且该boundary会发送到服务器
        req.pipe(fs.createWriteStream('form-file-upload-requst.txt'));

        var buff = [] ;
        req.on('data',function(chunk){
            buff.push(chunk);
        });

        req.on('end',function () {

            var fina = Buffer.concat(buff);  // 此处选择Buffer 是因为Buffer不受限于v8引擎内存限制
            // 此处我们手工解析请求
            var status = 'SEP' ;
            var sep = [] ;
            var fields = [] ;
            var values = [] ;
            var body = {} ;
            for(var i=0;i<fina.length;i++){
                if(fina[i] == 0x0d && fina[i+1] == 0x0a){
                    if(status == 'SEP'){
                        i++ ;
                        status = 'FIELD' ;
                    }else if(status == 'FIELD'){

                        // 说明当前post请求中有文件上传域,即有附件
                        if(fina[i].slice(i+2,i+14).toString() == 'Content-Type'){
                            i++ ;
                        }else{
                            i += 3 ;
                            status = 'VALUE' ;
                        }

                    }else if(status == 'VALUE'){

                        //正则取名字段名字
                        var fieldName = '' + /name="(\w+)"/.exec(new Buffer(fields).toString())[1] ;
                        var contentType = /Content-Type: ((\w|\|)+)/.exec(new Buffer(fields).toString())[1] ;
                        if(contentType){
                            var fileName = '' + Date.now() ;
                            fs.writeSync(fileName,new Buffer(values));
                            body[fileName] = {
                                name:fileName,
                                type:contentType
                            } ;
                        }

                        body[fieldName] = new Buffer(values).toString() ;

                        i++ ;
                        status = 'SEP' ;
                        sep.length = 0;
                        fields.length = 0;
                        values.length = 0;
                    }
                }else{
                    if(status == 'SEP'){
                       sep.push(fina[i]);
                    }else if(status == 'FIELD'){
                        fields.push(fina[i]);
                    }else if(status == 'VALUE'){
                        values.push(fina[i]);
                    }
                }
            }
            res.end(JSON.stringify(body))
        })

    }else{
        res.end('404');
    }
})

server.listen(8080);

// 可以在msgit bash窗口利用 curl -v  http://localhost:8080/ac 查看请求过程
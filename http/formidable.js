
var formidable = require('formidable');  // 解析表单的工具

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

        var form = new formidable.IncomingForm();
        form.parse(req,function (err, fields,files) {
            // fields - 保存所有field  ; files 中为所有附件

        })

    }else{
        res.end('404');
    }
})
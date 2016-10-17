/**
 *   1、生成客户端的私钥
 *      openssl genrsa -out ./client/client.key 1024
 *   2、生成csr
 *       openssl req -new -key ./client/client.key -out  ./client/client.csr
 *   3、向ca机构申请客户端证书
 *      openssl x509 -req -in ./client/client.csr -signkey  ./ca/ca.key  -out ./client/client.crt
 */

var tls = require('tls');
var fs = require('fs')

var options = {
    rejectUnauthorized:true,
    key:fs.readdirSync('./client/client.key') ,   // 客户端私钥
    cert:fs.readFileSync('./client/client.crt') , // 客户端证书
    ca:fs.readFileSync('./ca/ca.crt')   // 指定合法的颁发机构
}

var client = tls.connect(8080,'localhost',options,function () {
    console.log('connected');
    client.write('hello');
});

client.on('data',function(data){
    console.log('msg from server : %s',data);
});

client.end('end',function(){
   clint.close();
});


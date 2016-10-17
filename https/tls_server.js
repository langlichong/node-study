/**
 * 采用自签方式（自己给自己颁发证书）：
 * 1、生成证书服务器的私钥
 *      openssl genrsa -out ./ca/ca.key 1024
 * 2、生成证书服务器的csr(证书签名请求)
 *      openssl req -new -key ./ca/ca.key -out  ./ca/csr
 * 3、生成最终的证书
 *      openssl x509 -req -in ./ca/ca.csr -signkey  ./ca/ca.key  -out ./ca/ca.crt  (自签名证书)
 *
 *   对于服务器端，服务器向ca证书机构申请签名证书
 *   1、生成服务器的私钥
 *      openssl genrsa -out ./server/server.key 1024
 *   2、生成csr
 *       openssl req -new -key ./server/server.key -out  ./server/server.csr
 *   3、向ca机构申请证书
 *      openssl x509 -req -in ./server/server.csr -signkey  ./ca/ca.key  -out ./server/server.crt
 *
 *  CA机构将证书颁发给服务器之后，在客户端需要验证服务器的证书时，
 *  服务器会将该证书发给客户端，然后客户端通过CA验证真假，决定是否信任服务器
 */



var tls = require('tls');
var fs = require('fs')

var options = {
    key:fs.readdirSync('./server/server.key') ,   // 服务器私钥
    cert:fs.readFileSync('./server/server.crt') , // 服务器证书
    ca:fs.readFileSync('./ca/ca.crt')   // 指定合法的颁发机构
}

var server = tls.createServer(options,function (socket) {
    requestCert:true ,
    socket.write('hello') ;
    socket.setEncoding('utf8');
    socket.pipe(socket);
});

server.listen(8080);
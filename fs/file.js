
var fs = require('fs')

fs.readFileSync('./info','utf8',function(err,data){

    console.log(data);

})  // 同步读取

// 异步 - 推荐使用
fs.readFile('./info','utf8',function(err,data){

    console.log(data);

})

// 文件写入
fs.writeFileSync('./a.txt','狄航',{flag:'a',encoding:'utf8'},function(err){

    if(err){
        console.log(err);
    }else{
        console.log('写入成功')

    }
});

// 追加写入
fs.appendFile('a.txt',new Buffer('hello\r\n'));

/**
 * base64
 * base64字符范围 : A-Za-z0-9+/
 * 把3个8位字节转化为4个6位字节,之后再每个6位字节前面补充2个零
 * origi: 10111000 10100101  10001001
 * mid:   101110   001010  010110  001001
 * res : 00101110  00001010 00010110 00001001
 */
fs.readFile('./a.png','base64',function(err,data){

    fs.writeFile('b.png',data,'base64',function(){
        console.log('copy');
    })

})

// 珠 base64 十进制分别：57 56 62 32
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
console.log(str[57]+str[56]+str[62]+str[32]); // 54+g

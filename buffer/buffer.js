/**
 * buffer  - 输入输出缓冲区
 *
 */

/**
 * buffer 创建方式
 * 1、new的方式,直接给定缓冲区大小
 * 2、数组方式
 * 3、字符串方式
 * @type {Buffer}
 */
var buf1 = new Buffer(12) ;   // 分配的buffer所代表的内存去可能存在值
console.log(buf1)   // <Buffer 90 64 b6 2a a5 00 00 00 02 00 00 00>
// 将buffer清空
buf1.fill(0);
console.log(buf1)

//数组
var buf2 = new Buffer([1,2,3]);
console.log(buf2)

//字符串
var buf3 = new Buffer('汉字');   // 在utf8中一个汉字占用3个字节
console.log(buf3) //<Buffer e6 b1 89 e5 ad 97>

//字符串和buffer的长度
var str = 'hello 世界';
var buf4 = new Buffer(str) ;
console.log(str.length);  // 字符长度
console.log(buf4.length)   // 字节数

//修改
str[0] = '我' ;
console.log(str) ;  //  字符串是常量，不可修改 --hello 世界
buf4[0] = '1' ;
console.log(buf4)  //  <Buffer 01 65 6c 6c 6f 20 e4 b8 96 e7 95 8c>
// 截取
var subBuf = buf4.slice(1,2);
console.log(subBuf)
// 修改 子buff会影响父buff内容
subBuf[0] = 0 ;
console.log(buf4);
console.log(subBuf)

//toString

console.log(buf3.toString('utf8'))

// 写东西到buffer
var buff = new Buffer(12) ;
buff.write('hehe',0,4,'utf8'); // buff没有写满，剩余的字节空间中内容是随机的
console.log(buff)
console.log(buff.toString('utf8'));

//StringDecoder
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder();

console.log(decoder.write(buff))

buff.writeInt8();



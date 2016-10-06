/**
 * 如何从指定的位置读取文件 ，可以多次读取，每次读取小部分
 * 0 ： 代表标准输入 stdin
 * 1 : 代表标准输出 stdout
 * 2 ： 代表错误输出 stderr
 */

var fs = require('fs')

//fd - file desribtion  文件描述符

/*fs.open('a.txt','r',function(err,fd){

    console.log(fd);  // 输出 3
    process.stdout.print(fd)
})*/

/**
 * fs.read(fd, buffer, offset, length, position, callback)
 * fd  文件描述符
 * buffer  读到那个buffer
 * offset  buffer写入时偏移量
 * length  写入长度-字节
 * position  从文件哪个位置开始读
 * callback
 */

fs.open('a.txt','r',function(err,fd){
    var buf = new Buffer(9) ;  // 两个汉字
    // bytesRead  - 实际读到的字节数
    // buffer 与 buf是一个东西
    fs.read(fd,buf,0,6,3,function(err,bytesRead,buffer){

        console.log(bytesRead);
        console.log(buffer.toString());

        fs.read(fd,buf,6,3,9,function(){
            console.log(bytesRead);
            console.log(buffer.toString());
        })
    })
})

//同理可以在向文件的任意位置写入内容   -   fs.write()


/**
 *  流的使用
 *  使用stream.readable 接口的对象将对象转化为数据流
 *  常见的可读流：
 *    fs.ReadStream
 *    http.IncomingMessage - 客户端请求对象
 *    net.Socket - tcp的客户端
 *    gzip、deflag 数据压缩流
 *
 */
var fs = require('fs')

/**
 * 读取流分类：
 *  - 流动模式
 *  - 非流动模式（暂停模式）
 */
var rs = fs.createReadStream('a.txt',{start:3,end:8}) // 该区间是 (3,8]

rs.on('open',function () {
    console.log('opened file');
})

// 暂停
rs.pause()

//继续
setTimeout(function(){
    rs.resume();
},5000)

// 可以在open事件之后直接调用resume方法，此时还没有监听data事件，在监听data事件之前的所有数据都会丢失

//当读到数据时 ，默认读取时每次读取64k，就回调一次该方法
rs.on('data',function (data) {
    console.log('data:'+data);
})


//当读到文件末尾的时候
rs.on('end',function(data){
    console.log('EOF')
})
// 当文件关闭时
rs.on('close',function (data) {

    console.log('file closed')
})



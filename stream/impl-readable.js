/**
 * Readable  - 内部维护了一个buffer，读数据时就是往buffer中写数据
 */
var Readable = require('stream').Readable ;
var util = require('util') ;

util.inherits(Counter,Readable);  // 让Counter继承Readable

function Counter(opt){

    Readable.call(this) ; //使用readable中成员初始化Counter
    this._start = opt.start ;
    this._end = opt.end ;

}

//实现Readable中的read方法,所有Readable的子类都必须提供一个read方法用于抓取数据
// Readble工作原理是：将数据放置到一个队列中，当Readable事件发生时，用read方法将数据从队列中输出
Counter.prototype._read = function () {

    if(this._start > this._end){ //到头了

        this.push(null);  // null 意味着流读取结束，会触发end事件

    }else{
        this.push(this._start+"");
    }

    this._start++ ;
}

var counter = new Counter({start:1,end:10});
counter.setEncoding('utf8')
counter.on('data',function (data) {
    console.log(data);
})

counter.on('end',function (data) {
    console.log('end reading ')
})
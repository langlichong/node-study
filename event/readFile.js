var fs = require('fs')

var user = {}

fs.readFile('./name.txt',function(err,data){

    user['name'] = data ;

})

fs.readFile('./age.txt',function(err,data){

    user['age'] = data ;

})

console.dir(user);   // 输出为空  ，当前该语句为同步的，而读文件为异步的，同步语句优先执行

// 作如下改造 , 但是存在问题：异步变成了同步  ，代码嵌套不已阅读

fs.readFile('./name.txt','utf8',function(err,data){

    user['name'] = data ;

    fs.readFile('./age.txt','utf8',function(err,data){

        user['age'] = data ;

        console.dir(user);

    })

})

// 可以使用事件方式实现需求： eventemitter

var count = 0 ;

var done = function(key,value){
    user[key] = value ;
    if(++count == 2){
        console.dir(user) ;
    }
}


var EventEmitter =  require('events').EventEmitter ;

var e = new EventEmitter();

e.on('name',done);
e.on('age',done);

fs.readFile('./name.txt','utf8',function(err,data){

    e.emit('name','name',data);

})

fs.readFile('./age.txt','utf8',function(err,data){

    e.emit('age','age',data);

})
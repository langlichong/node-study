/**
 * Created by wuwangwo on 2016/10/3.
 */

/**
 *  每个应用程序是进程类的实例对象
 *  在nodejs中process代表nodejs的当前应用程序
 *  可以获取用户信息及各种环境信息
 */

// console.log(process);  // 查看process中有哪些属性

process.stdout.write('hello') // 就是console.log的实现就这样

//获取标准输入
// 从标准输入输入时回调该方法，并将输入保存到data中
process.stdin.on('data',function(data){

    process.stdout.write(''+data);

});

// 获取命令行参数

process.argv.forEach(function(item){

    console.log(item);
})

process.on('exit',function(){

})

//异常处理--- 未捕获异常
process.on('uncaughtExcetion',function(){

})
// try ... catch

try {

}catch(err){

}

/**
 * { rss: 17281024, heapTotal: 7409232, heapUsed: 3916552 }
 * rss - 进程常驻内存  resident set size   -- 如酒店的清洁人员天天住酒店
 * heapTotal -  申请到的堆内存
 */
console.log(process.memoryUsage())

console.log(process.cwd());  // 当前工作目录，不同于__dirname (对于确定的文件而言dirname是固定的，他就在那，但工作目录是会变得)




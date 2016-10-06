/**
 * Created by wuwangwo on 2016/10/3.
 */
/*

/!**
 * 同步异步
 *!/

var bun ;// 包子
var cucumber ;//黄瓜

function set1(){

    setInterval(function(){
        bun = 'bun' ;
    },2000);

}

function set2(){

    setInterval(function(){

        cucumber = 'cucumber' ;

    },60000)
}

function eat(){

    console.log(bun,cucumber);
}

// 调用序列一
set1();
set2();
eat();

// 如果没有setInterval 则序列一没问题

 */

function hehe(){

    console.log('haha ------')
}

// 先输出next，后调用
setTimeout(hehe,0) ;
console.log('next') ;

//与以上效果相同，但是nextTick 要比setTimeout 快得多，尽量使用node的实现
// nextTick 会先执行，直到所有nextTick执行完才给别的代码机会
setImmediate(hehe);  // 没有nextTick快
process.nextTick(hehe); // 下一个事件环的时候执行
console.log('next') ;

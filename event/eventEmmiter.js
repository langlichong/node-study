/**
 * Created by wuwangwo on 2016/10/4.
 */
var EventEmitter = require('events').EventEmitter ;
var util  = require('util');

/**
 * 常用方法：
 *  addListener - 绑定事件
 *  on - 绑定事件
 *  once - 触发一次就解除绑定
 *  removeAllListeners  - 移除所有监听者
 *  listeners - 获取特定对象上某个事件的所有监听者（回调函数）
 */


function Teacher(name){

    this.name = name
}

// 实现继承
util.inherits(Teacher,EventEmitter);

var zw = new Teacher('wei');

zw.on('hungry',function(){

    console.log('eat something');
});

zw.addListener('hungry',function(){

    console.log('eat something');
})

zw.once('marry',function(){
    console.log('事件只绑定一次')
})
// 以上两者没有区别
zw.emit();

//查看某事件上绑定了多少监听者
console.log(zw.listeners('hungry'));

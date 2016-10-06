/**
 * Created by wuwangwo on 2016/10/3.
 */

/**
 * 控制台就是一个界面，是标准输出 有级别：log、 info 、warn、error、
 */

// 标准输出
console.log('hello world')

//格式化输出
console.log("tom is a %s",'cat');
console.log("this is object %s","{name:'tom',age:1}");
console.log("this is object %j","{name:'tom',age:1}");  // j - json
console.log('this is a num - %d ',12);

//简单计算
console.log(1==2);
console.log(1+2) ;
console.log(3>2) ;

// 标准输出级别
console.log('123')
console.error('233')
console.info('11')
console.warn('3434')

//输出json
var obj = {
    name:'tom',
    type:'cat',
    age:3
}

console.log(JSON.stringify(obj));
console.dir(obj) //查看对象内容及输出对象

//查看堆栈信息
console.trace('hehe');






/**
 * Created by wuwangwo on 2016/10/3.
 */


/*
* node 中可以直接使用而不用加前缀的有两种形式：
* 1、global的可以直接用  process 等
* 2、node自动帮我们注入的属性：__filename 、__dirname 等
*
* */

// console.log(global);
console.log(process == global.process); // 全局的上下文可以省略，如 甘肃 == 中国甘肃

console.log(__filename) ;  // 并不是global属性 ，但为啥可以这么用，是因为node自动帮我们注入的属性
console.log(__dirname) ; // 并不是global属性

/////////////////////////////////
// 全局变量的声明  , 不建议使用global或直接定义全局变量 ，因为会污染全局变量域

//1、利用global定义
global.name = 'jerry' ;
console.log(name);
console.log(global.name);

age = 12 ;
console.log(age)
console.log(global.age)
//////////////////////////////

/**
 * Created by wuwangwo on 2016/10/3.
 */

/**
 *  utils 模块,基于对象间原型继承的实现函数
 */

var util  = require('util');

console.log(util.inspect({name:'heh'}));

console.log(util.isArray(new Array()))
console.log(util.isRegExp(/\d/))
console.log(util.isDate(new Date()));
console.log(util.isError(new Error()))


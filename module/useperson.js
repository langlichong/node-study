
var person = require('./person.js')   // 导入后其实就是得到person的exports对象

console.log(person.name) ;  // exports中有name属性
console.log(person.age) ;  // exports没有age属性

// 当第一次require某个模块后，后面再执行require是不会重新执行导入相关的语句的，只是返回第一次require的引用
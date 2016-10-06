var path = require('path');  // 用于处理路径

/**
 *  normalize - 将非标准话路径转化为标准化路径
 *  1、解析 . 和 .. 路径
 *  2、过个斜杠会转换为一个斜杠
 *  3、windows下斜杠会转化为正斜杠
 *  4、以斜杠结尾则保留
 */
console.log(path.normalize('./a'))
console.log(path.normalize('../a'))
console.log(path.normalize('./a/b/c'))
console.log(path.normalize('./a///../b/c/'))

/**
 * 将多个字符串路径拼接为一个
 */
console.log(path.join(__dirname,'a','/a/b'));

/**
 * resolve -
 * 以应用程序为根目录根据参数解析出一个绝对路径
 * 1、参数为空，则代表当前目录
 * 2、普通字符串代表子路经
 * 3、/代表绝对路径
 */
console.log(path.resolve())
console.log(path.resolve('a'))  //D:\node\path\a
console.log(path.resolve('/a','b'))  //  D:\a\b
console.log(path.resolve('a','b')) //  D:\node\path\a\b
console.log(path.resolve('a','..','b'))
console.log(path.resolve('a','/b'))  // D:\b

/**
 *  relative
 *  获取两个路径之间的相对关系 (在一个路径下，如何去访问另一个文件)
*/
console.log(path.relative(__dirname,'../a'));  //   ..\a
console.log(path.relative(__dirname,'/a'));  //   ..\..\a
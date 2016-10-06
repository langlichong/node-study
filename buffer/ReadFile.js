
var fs = require('fs');

/**
 * path, options, callback
 * path - 文件路径
 * options  -选项可选
 * callback - 回调
 */
fs.readFile('./info',function(err,data){

    if(err){
        console.error(err)
    }else{
        console.log(data)
    }
})


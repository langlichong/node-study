var fs = require('fs')

var rs = fs.createReadStream('a.txt');
rs.on('readable',function () {
    console.log('----------- data is ready ----------')
    var data ;
    while(null != (data = rs.read())){

    }
})

// 写文件流
var out = fs.createWriteStream('b.txt');
for(var i=0;i<1000;i++){
    var flag = out.write(i.toString());
    console.log(flag);
}

out.on('drain',function () {
    console.log('缓存区中的数据全部输出')
})
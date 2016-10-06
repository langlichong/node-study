/**
 * 目录操作
 */

var BUFF_SIZE = 1024*8 ;

var fs = require('fs') ;

function copy(src,dest){

    var buf = new Buffer(BUFF_SIZE) ;
    var srcFd = fs.openSync(src,'r');
    var destFd = fs.openSync(dest,'w') ;

    var readSofar =  0 ;
    do{
        var readedBytes = fs.read(srcFd,buf,0,BUFF_SIZE,readSofar);

        fs.writeSync(destFd,buf,0,readedBytes,null);

        readSofar += readedBytes ;

    }while(readedBytes == BUFF_SIZE)

    fs.closeSync(srcFd);
    fs.closeSync(destFd);
}

copy('a.txt','a-bak.txt');

// 目录操作哟
/*
//创建
fs.mkdir('test',function(err){
    if(err){
        console.log(err)
    }else{
        console.log('mkdir ok')
    }
})
*/

// 读取目录
fs.readdir('./',function(err,files){

    if(err){
        console.log(err);
    }else{
        console.log(files) ;
    }
})

// 查看文件后者目录的信息 fs.stat()
fs.stat('./',function(err,stat){
     console.log(stat);
    console.log(stat.isFile());
    console.log(stat.isDirectory())
    console.log(stat.size)
})

// 存在性判断
fs.exists('./a.txt',function(exists){
    console.log(exists);
});

// 路径
fs.realpath('a.txt',function (err, path) {

    console.log(path)  ; // path 是一个绝对路劲
})

console.log('sdfdsfsd ' +require('path').resolve('a.txt')) ;// 该语句输出在最前面，因为该句为同步的，带回调的都是异步的

/*fs.utimes();
fs.chmod();
fs.rename()
 fs.watchFile()
*/

//　文件分隔符　：　p.sep

fs.watchFile('a.txt',function (curr, prev) {

    if(Date.parse(prev.ctime) == 0 ){
        console.log('文件刚刚创建')
    }else if(Date.parse(curr.ctime) == 0 ){
        console.log('文件刚刚删除')
    }else{
        console.log('文件刚刚被修改')
    }
})





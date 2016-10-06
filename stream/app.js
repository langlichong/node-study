
var fs = require('fs');
var path = require('path');
var stdin = process.stdin ;
var stdout = process.stdout ;

/**
 * 获取当前目录绝对路径
 * __dirname
 * process.cwd()
 * path.resolve()
 */
fs.readdir(process.cwd(),function(err,files){

    if(!files.length){
        console.log('empty directory')
    }

    var stats = {} ;

    function showFile(i){

        var fileName = files[i] ;
        fs.stat(path.join(process.cwd(),fileName),function(err,stat){

            stats[i] = stat ; //将每个文件的stat缓存起来

            if(stat.isDirectory()){

                console.log(' ' + i + ' \033[31m'+fileName+'\033[39m')
            }else if(stat.isFile()){
                console.log(' ' + i + ' \033[32m'+fileName+'\033[39m')
            }
            i++ ;
            if(i == files.length){
                console.log('no file ')
                readChoice();
            }else{
                showFile(i);
            }
        })
    }

    showFile(0) ;
    
    function readChoice() {

        stdout.write('please input your choice');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data',onData)

    }

    function onData(data){

        var index = new Number(data);

        var stat = stats[index] ;

        if(!stat){ // 不存在，则是用户随便输的
            stdout.write('input is not crorect')
        }else{
            if(stat.isDirectory()){

                fs.readdir(path.join(process.cwd(), files[index]),function (err, subFiles) {
                    console.log('file numbers :' + subFiles.length);

                    subFiles.forEach(function(subFile){

                        console.log('-' + subFile);
                        process.exit(0);
                    })
                })

            }else{
                fs.readFile(path.join(process.cwd(), files[index]),'utf8',function (err, data) {
                    console.log('')
                    console.log(data);
                    process.exit(0);
                });
            }
        }

    }
})


var Writable = require('stream').Writable;
var util = require('util') ;

util.inherits(ConsoleWriteStream,Writable);

function ConsoleWriteStream(){

    Writable.call(this);
}

ConsoleWriteStream.prototype._write = function (data,encoding,callback) {

    console.log(data.toString());
    callback();
}

var ws = new ConsoleWriteStream();
ws.write(new Buffer('shu ju '),'utf8',function () {
    console.log('sucessfully ')
});

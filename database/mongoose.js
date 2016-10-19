// mongoose 是相当于MongoDB的一个ORM模型


var mongoose = require('mongoose');
var assert = require('assert');

var conn = mongoose.createConnection('mongodb://192.168.19.44/test',function (err) {
    assert.equal(null,err);

});

var Schema = mongoose.Schema ;
var objectId = mongoose.ObjectId;

// 滴自定义schema
var AuthorSchema = new Schema({
    name:String
});
// 定义一个模型
var Author = conn.model('Author',AuthorSchema);

new Author({name:'haha'}).save();

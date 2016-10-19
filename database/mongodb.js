var client = require('mongodb').MongoClient ;

client.connect('mongodb://192.168.19.44/test',function (err, db) {

    console.log('connect successfully !')

    /* db.collection('person').save({name:'tom',age:3},function (err, result) {
     console.log(result.result);
     db.close();
     });*/

    // 多条插入
    /* db.collection('person').insert([{name:'tom',age:3},{name:'jerry',age:4},{name:'kevin',age:5}],function (err, result) {
     console.log(result.result);
     db.close();
     });*/


    //分页
     db.collection('person').find({}).skip(2).limit(10).toArray(function (err, result) {

         console.log(result);
     });


})

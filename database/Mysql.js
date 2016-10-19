var mysql = require('mysql');


//连接池
var pool = mysql.createPool({
    host:'192.168.19.126',
    user:'root',
    password:'root',
    database:'provider',
    acquireTimeout:10000,
    connectionLimit:2,
    queueLimit:8 // 等待连接的数量 ，0 表示不限制

});

pool.query('select 123 from dual ',[],function (err, result) {
    console.log(result);
});

function startQuery() {
    pool.getConnection(function (err,connection) {
        connection.query('select * from user',function (err, result) {
            console.log(result.length);
            connection.release();
        })
    })
}



// ////////////////////////////////////////////////////////
///////////////////////////////////////////

var conn = mysql.createConnection({
    host:'192.168.19.126',
    user:'root',
    password:'root',
    database:'provider',
    queryFormat:function (query,values) { // 返回什么sql，在此处组装即可

       // return 'select * from user';
        return query.replace(/@(\w+)/g,function (text, key) {
            if(values.hasOwnProperty(key)){
               // return this.escape(values[key]);
                return conn.escape(values[key]);
            }else{
                return text ;
            }
        }.bind(this))
    }
});

conn.connect();
var sql = 'select * from netapp7' ;
conn.query(sql,function(err,rows,fields){

    if(err){
        throw  err ;
    }else{
        console.log(rows);
        if(rows && rows.length>0){
            console.log('login successfully!');
            rows.forEach(function (item) {
                console.log(item['ip']);
            });
        }
    }
    conn.destroy();
})
var username = '' ;
var password = '' ;
var sql2 = 'select * from user where username = ? and password = ?' ;
conn.query(sql,[username,password],function (err, rows, fields) {  // 防止sql注入操作

})

// 甚至
var username = '' ;
var password = '' ;
var sql2 = 'select ?? from user where username = ? and password=' ;
conn.query(sql,[['username'],username,password],function (err, rows, fields) {  // 防止sql注入操作

})

var username = '' ;
var password = '' ;
var sql2 = 'select ?? from user where username = @username and password = @password' ; // 自定义命名参数
conn.query(sql,{username:username,password:password},function (err, rows, fields) {

})
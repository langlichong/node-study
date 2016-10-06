/**
 * Created by wuwangwo on 2016/10/4.
 */



// 多少次才执行到某个函数

function after(times,func){

    if(times <= 0){
        return func ;
    }

    return function(){
        if(--times< 1){

            //return func.call(this,arguments);
            //调用func本身
            return func.apply(this,arguments);
        }

    }

}

// 3口吃光苹果  注意闭包
var eatApple = after(3,function(){
    console.log('苹果吃光了');
})

eatApple();  // 吃第1口
eatApple();  // 吃第2口
eatApple();  // 吃第3口
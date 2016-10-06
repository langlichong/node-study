
/**
   事件
 */


//call & apply

var person = {

    name:'tom',
    say:function(words){

        console.log(this.name + ' say - ' + words)
    }
}

person.say('gua da feng ');

var p = {

    name:'NodeJs'
}

// 让p作为this调用say方法   apply 与call效果相同   -- 绑定this
person.say.call(p,'hello') ;
person.say.apply(p,['hello']) ;

// 得到一个函数永久与对象绑定,永邦定上下文 -  bind

// 绑定参数到对象，返回一个函数
var pSay =  person.say.bind(p,'phello');
pSay('world ');


//事件  - 发布订阅

function Event(){

    this._events = {}
}

//注册事件
Event.prototype.on = function(eventName,listener){

    if(this._events[eventName]){

        this._events[eventName].push(listener);

    }else{
        this._events[eventName] = [listener] ;
    }

}
//发射事件
Event.prototype.trigger = function(eventName){

    var count = this._events[eventName].length ;

    for(var i=0;i<count;i++){

        this._events[eventName][i].call(this)
    }
}

var button = new Event();

button.on('click',function(){

    console.log('clicked---1') ;
})

button.on('click',function(){

    console.log('clicked----2') ;
})

button.trigger('click');  // 类似在界面点击buton


console.log(Function)
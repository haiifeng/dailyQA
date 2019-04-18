/*
* 2019-04-17
* 第 56 题：要求设计 LazyMan 类，实现以下功能。
* LazyMan('Tony');
* // Hi I am Tony
* 
* LazyMan('Tony').sleep(10).eat('lunch');
* // Hi I am Tony
* // 等待了10秒...
* // I am eating lunch
* 
* LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
* // Hi I am Tony
* // I am eating lunch
* // 等待了10秒...
* // I am eating diner
* 
* LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
* // Hi I am Tony
* // 等待了5秒...
* // I am eating lunch
* // I am eating dinner
* // 等待了10秒...
* // I am eating junk food
*/
class LazyMan{
    constructor(params){
        console.log(`Hi I am ${params}`);
    }
    sleep(params){
        console.log(`等待了${params}秒`);
        return this;
    }
    eat(params){
        console.log(`I am eating ${params}`);
        return this;
    }
    sleepFirst(params){
        console.log(`等待了${params}秒`);
        return this;
    }

}
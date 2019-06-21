/**
 * 算法思路
 */


class LazyManClass {
    constructor(name) {
        this.taskQueue = [];//定义一个任务队列用来存放任务
        this.name = name;
        console.log(`Hi I am ${this.name}`);
        setTimeout(() => {
            this.next();
        }, 0);
    }
    sleep (time) {
        console.log("sleep")
        var that = this
        var fn = (function (t) {
            console.log("sleep里的立即执行")
            return function () {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next();
                }, t * 1000);
            }
        })(time);
        this.taskQueue.push(fn);//将任务放入到队列中排队等候
        return this;
    }
    eat (name) {
        console.log("eat")
        var that = this;
        var fn = function () {
            console.log("eat改为为立即执行函数")
                console.log(`I am eating ${name}`)
                that.next();
            };
        this.taskQueue.push(fn);
        return this;
    }
    sleepFirst (time) {
        console.log("sleepFirst")
        var that = this;
        var fn = (function (t) {
            console.log("sleepFirst里的立即执行函数")
            return function () {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next();
                }, t * 1000);
            }
        })(time);
        this.taskQueue.unshift(fn);//将该任务放在队列首位优先执行
        return this;
    }
    next () {
        console.log("next")
        var fn = this.taskQueue.shift();//将任务队列中的第一个任务取出并执行
        fn && fn();
    }
}

function LazyMan(name) {
    return new LazyManClass(name);
}
// 每次调用该类中的方法，就会将方法中的立即执行函数放入到任务队列中
// LazyMan('tanqq').sleep(5).eat('breakFirst').sleep(5).eat('lunch').sleepFirst(5).sleep(6);
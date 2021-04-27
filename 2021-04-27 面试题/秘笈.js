// call apply bind
Function.prototype.call2 = function(context){
    let ctx = Object(context) || window;
    ctx.fn = this;
    let args = [];
    for(let i = 1;i<arguments.length;i++){
        args.push(arguments[i]);
    }
    let res = ctx.fn(...args);
    delete ctx.fn;
    return res;
}
Function.prototype.apply2 = function(context,arr){
    let ctx = Object(context) || window;
    ctx.fn = this;
    let res;
    if(!arr){
        res = ctx.fn();
    }else{
        let args = [];
        for(let i = 1;i<arguments.length;i++){
            args.push(arguments[i]);
        }
        res = ctx.fn(...args);
    }
    delete ctx.fn;
    return res;
}
Function.prototype.myBind = function(oThis){
    let self = this;
    let args = Array.prototype.slice.call(arguments,1);
    let initFunc = function(){};
    let fBound = function(){
        return self.apply(this instanceof initFunc ? this : oThis,
            args.concat(Array.prototype.slice.call(arguments)));
    }
    initFunc.prototype = this.prototype;
    fBound.prototype = new initFunc();
    return fBound;
}
// new
// new的作用主要就是访问构造函数里面的属性和访问构造函数的prototype中的属性
// 用Constructor.apply(obj,arguments)来给obj添加新的属性
// 实例的__proto__属性会指向构造函数的prototype，正式因为这样的关系，可以让实例obj访问构造函数prototype的属性
function myNew(){
    let obj = new Object();
    let Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    let res = Constructor.apply(obj,arguments);
    return typeof res === 'object' ? res : obj;
}
// 类数组转数组
[...arguments];
Array.from(arguments);
Array.prototype.slice.call(arguments);
// 寄生组合式继承
function prototype(child,parent){
    function f(){};
    f.prototype = parent.prototype;
    let prototype = new f();
    prototype.constructor = child;
    child.prototype = prototype;
}
//防抖
function debounce(func,wait){
    let timer;
    return function(){
        let self = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(self,args);
        }, wait);
    }
}
//节流
function throttle(func,wait){
    let start = 0;
    return function(){
        let self = this;
        let args = arguments;
        let now = +new Date();
        if(now - start > wait){
            func.apply(self,args);
            start = now;
        }
    }
}
function throttle(func,wait){
    let timer;
    return function(){
        let self = this;
        let args = arguments;
        if(!timer){
            timer = setTimeout(() => {
                timer = null;
                func.apply(self,args);
            }, wait);
        }
    }
}
// 数组去重
console.log(Array.from(new Set(arr)))
console.log([...new Set(arr)])
function fn(arr){
    let res = [];
    for(let i = 0;i<arr.length;i++){
        if(!res.includes(arr[i])){
            res.push(arr[i]);
        }
    }
    return res;
}
// 精确判断数据类型
Object.prototype.toString.call();
/*
当toString方法被调用的时候
会让class成为内部属性[[Class]]的值
最后返回[object class]
 */
//克隆
function deepClone(obj){
    if(typeof obj !== 'object')return;
    let newObj = Array.isArray(obj) ? [] : {};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}
//jq的extend简单仿写
function extend(){
    //默认进行浅拷贝
    let deep = false;
    //不传布尔值的情况下 target是第一个参数
    let target = arguments[0] || {};
    //记录要复制的对象的下标
    let i = 1;
    let options,init,copy;
    //如果第一个参数是布尔值，那么第二个参数才是target
    if(typeof target === 'boolean'){
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    //如果target不是对象，没办法进行复制，所以设为{}
    if(typeof target !== 'object'){
        target = {};
    }
    //循环遍历要复制的对象们
    for(;i<arguments.length;i++){
        //获取当前对象
        options = arguments[i];
        //当前对象不能为空 避免出现extend(a,,b)的情况
        if(options){
            for(let key in options){
                if(options.hasOwnProperty(key)){
                    //目标属性值
                    init = target[key];
                    //要复制的对象属性值
                    copy = options[key];
                    if(deep && copy && typeof copy === 'object'){
                        target[key] = extend(deep,init,copy);
                    }else if(copy !== undefined){
                        target[key] = copy;
                    }
                }
            }
        }
    }
    return target;
}
// 求数字的最大值和最小值
console.log(Math.max.apply(null,arr))
console.log(Math.max.call(null,...arr))
function fn(arr){
    return arr.sort((a,b) => {
        return b - a;
    })
}
//数组扁平化
function fn(arr){
    return arr.reduce((pre,next) => {
        return pre.concat(Array.isArray(next) ? fn(next) : next);
    },[])
}
function fn2(arr){
    let res = [];
    for(let i = 0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            res = res.concat(fn2(arr[i]));
        }else{
            res = res.concat(arr[i]);
        }
    }
    return res;
}
function fn3(arr){
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr);
    }
    return arr;
}
// 实现从前往后找第一个符合条件的数组成员和从后往前找第一个符合条件的数组成员
// findIndex   findLastIndex
function createIndexFinder(e){
    return function(arr,func,context){
        let i = e === 1 ? 0 : arr.length - 1;
        for(;i>=0 && i<arr.length;i += e){
            if(func.call(context,arr[i],i,arr)){
                return i
            }
        }
        return -1
    }
}
//在一个排好序的数组中找到value的位置，并保证插入数组中，依然是有序状态
function sortIndex(arr,val){
    let start = 0;
    let end = arr.length;
    while(start < end){
        let middle = Math.floor((start + end) / 2);
        if(arr[middle] < val){
            start = middle + 1;
        }else{
            end = middle;
        }
    }
    arr.splice(end,0,val);
    return arr
}
// 数组乱序
/*
原sort排序实现数组乱序不彻底
V8在处理sort的时候，当目标数组长度小于10时使用插入排序，反之使用快排和插入排序的混合排序
根本原因是：在插入排序算法中，当待排元素和有序元素进行比较时，一旦确定了位置就不会再和位置前面的有序元素再做比较，所以导致乱序不彻底
 */
function Random(arr){
    for(let i = arr.length;i>0;i--){
        let j = Math.floor(Math.random() * i);
        [arr[i - 1],arr[j]] = [arr[j],arr[i - 1]];
    }
    return arr;
}
// 函数柯里化
function curry(fn,args){
    let length = fn.length;
    let theArgs = args || [];
    return function(){
        let newArgs = theArgs.concat(Array.prototype.slice.call(arguments));
        if(newArgs.length < length){
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}
// 二分法查找
function fn(arr,val){
    let start = 0;
    let end = arr.length;
    while(start <= end){
        let middle = Math.floor((start + end) / 2);
        if(arr[middle] === val){
            return middle;
        }else if(arr[middle] > val){
            end = middle - 1;
        }else if(arr[middle] < val){
            start = middle + 1;
        }
    }
    return -1
}
// 冒泡排序
function sort(arr){
    for(let i = 0;i<arr.length;i++){
        for(let j = 0;j<arr.length - i - 1;j++){
            if(arr[j+1] < arr[j]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
            }
        }
    }
    return arr
}
// 快速排序
function fn(arr){
    if(arr.length <=1){
        return arr;
    }
    let middle = Math.floor(arr.length / 2);
    let middleVal = arr.splice(middle,1)[0];
    let leftArr = [],rightArr = [];
    for(let i = 0;i<arr.length;i++){
        if(arr[i] < middleVal){
            leftArr.push(arr[i]);
        }else{
            rightArr.push(arr[i]);
        }
    }
    return fn(leftArr).concat(middleVal,fn(rightArr));
}
// 插入排序
function fn(arr){
    for(let i = 1;i<arr.length;i++){
        let compare = arr[i];
        let j = i - 1;
        while(arr[j] > compare){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = compare;
    }
    return arr
}
// 使用reduce的方法实现map
function fn(arr,cb,ctx){
    return arr.reduce((pre,cur,index,array) => {
        pre[index] = cb.call(ctx,cur,index,array);
        return pre;
    },[])
}
// 写一个生成min到max的随机数
function Random(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// sleep函数 1s钟后输出1 3s钟后输出3 2s钟后输出2
let arr = [1,3,2];
async function fn(arr){
    for(let i = 0;i<arr.length;i++){
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(arr[i]);
                resolve();
            }, arr[i] * 1000);
        })
    }
}
// 一个整数随机数组，其中一个数字是单独出现的，其余全部成对出现，找出这个单独出现的数字
function fn(arr){
    let res = arr[0];
    for(let i = 1;i<arr.length;i++){
        res ^= arr[i]
    }
    return res
}
/**
 * 创建repeat函数 function repeat(func,times,wait) {};
 * 输入 const repeatFunc = repeat(alert,4,3000);
 * 执行repeatFunc('helloworld');
 * 间隔3秒 alert 4次 helloworld
 */
function repeat(func,times,wait){
    return function(str){
        let count = 0;
        let timer = setInterval(() => {
            count++;
            func(str);
            if(count === times){
                clearInterval(timer)
            }
        },wait)
    }
}
// 斐波那契数列，一个人上楼，一步可以上2个台阶或1个，如果有N个台阶，有多少种走法
// 采用尾递归调用
function fib(n,a = 1,b = 1){
    if(n <= 1)return b;
    return fib(n-1,b,a+b)
}
// 模仿underscore实现一个template模板引擎
function fn(tpl,data){
    let tplArr = tpl.split(/(\<%=?|%\>)/gm);
    let funcBody = ["with(this){let result = [];"];
    let code = 0;
    for(let i = 0;i<tplArr.length;i++){
        if(tplArr[i] === '<%'){
            code = 1;
            continue;
        }else if(tplArr[i] === '<%='){
            code = 2;
            continue;
        }else if(tplArr[i] === '%>'){
            code = 0;
            continue;
        }
        if(code === 1){
            funcBody.push(tplArr[i]);
        }else if(code === 2){
            funcBody.push("result.push(");
            funcBody.push(tplArr[i]);
            funcBody.push(");");
        }else if(code === 0){
            funcBody.push("result.push(\"");
            funcBody.push(tplArr[i]);
            funcBody.push("\");");
        }
    funcBody.push("return result.join('');}");
    let res = new Function(funcBody.join(""));
    return res.call(data);
}
// 实现一个自定义函数
function Event(){
    this.handlers = {};

    this.on = function(type,handler,once = false){
        if(!this.handlers[type]){
            this.handlers[type] = [];
        }
        if(!this.handlers[type].includes(handler)){
            this.handlers[type].push(handler);
            handler.noce = once;
        }
    }

    this.off = function(type,handler){
        if(!this.handlers[type]){
            this.handlers[type] = [];
        }else{
            this.handlers[type] = this.handlers[type].filter((fn) => {
                return fn !== handler;
            })
        }
    }

    this.trigger = function(type,eventData){
        if(this.handlers[type]){
            this.handlers[type].forEach((fn) => {
                fn.call(this,eventData);
                if(fn.once){
                    this.off(type,fn);
                }
            })
        }
    }

    this.once = function(type,handler,once = true){
        this.on(type,handler,once);
    }
}
// 实现LazyMan函数
(function(window){
    let taskList = [];

    function subscribe(){
        let args = Array.prototype.slice.call(arguments);
        let params = {};
        params.handle = args[0];
        params.handleData = args.slice(1);
        if(params.handle === 'sleepFirst'){
            taskList.unshift(params);
        }else{
            taskList.push(params);
        }
    }
    function publish(){
        if(taskList.length){
            run(taskList.shift());
        }
    }
    function run(options){
        let handle = options.handle;
        let handleData = options.handleData;
        if(handle === 'lazyMain'){
            lazyMain.apply(null,handleData);
        }else if(handle === 'eat'){
            eat.apply(null,handleData);
        }else if(handle === 'sleep'){
            sleep.apply(null,handleData);
        }else{
            sleepFirst.apply(null,handleData);
        }
    }
    function LazyMan(){}
    LazyMan.prototype.eat = function(str){
        subscribe('eat',str);
        return this;
    }
    LazyMan.prototype.sleep = function(delay){
        subscribe('sleep',delay);
        return this;
    }
    LazyMan.prototype.sleepFirst = function(delay){
        subscribe('sleepFirst',delay);
        return this;
    }
    function lazyMain(str){
        console.log('lazyMain',str);
        publish();
    }
    function eat(str){
        console.log('eat',str);
        publish();
    }
    function sleep(delay){
        setTimeout(() => {
            console.log('sleep',delay);
            publish();
        }, delay * 1000);
    }
    function sleepFirst(delay){
        setTimeout(() => {
            console.log('sleepFirst',delay);
            publish();
        }, delay * 1000);
    }

    window.LazyMan = function(str){
        subscribe('lazyMain',str);
        setTimeout(() => {
            publish();
        }, 0);
        return new LazyMan();
    }
})(window);
//给定一个无序的，不重复的数组data，任意抽取n个数，相加和为sum，列出所有组合
function fn(arr,n,sum) {
    let resArr = [];
    function handle(arr,n,res,start) {
        if(res.length === n){
            return resArr.push(res);
        }
        if(start === arr.length){
            return;
        }
        handle(arr,n,res.slice(),start + 1);
        res.push(arr[start]);
        handle(arr,n,res,start + 1);
    }
    handle(arr,n,[],0);
    let finaArr = [];
    let reducer = (pre,next) => pre + next;
    for(let i = 0;i<resArr.length;i++){
        let item = resArr[i].reduce(reducer);
        if(item === sum){
            finaArr.push(resArr[i]);
        }
    }
    return finaArr;
}
// 实现instanceof
function fn(left,right) {
    if(typeof left !== "object" || left === null){
        return false;
    }
    let proto = Object.getPrototypeOf(left);
    while (true){
        if(proto === null)return false;
        if(proto === right.prototype)return true;
        proto = Object.getPrototypeOf(proto);
    }
}
// 原生js实现map方法
function Map(arr,cb) {
    let res = [];
    for(let i = 0;i<arr.length;i++){
        let result = cb.call(this,arr[i],i,arr);
        res.push(result);
    }
    return res;
}
// 汉诺塔输出移动步骤
function hano(n,a,b,c){
    if(n === 1){
        console.log(`move ${n} from ${a} to ${c}`);
    }else{
        hano(n-1,a,c,b);
        console.log(`move ${n} from ${a} to ${c}`);
        hano(n-1,b,a,c);
    }
}
// 一个数组中都是不相等的整数，给出一个特定的值，输出数组中第一次出现的两个值得和等于特定值的数字
function fn(arr,val) {
    for(let i = 0;i<arr.length;i++){
        let res = val - arr[i];
        let index = arr.indexOf(res)
        if(index !== -1){
            return [i,index];
        }
    }
}
// 求两个字符串的最长公共子串
function fn(str1,str2){
    for(let i = str2.length;i>0;i--){
        for(let j = 0;j + i<=str2.length;j++){
            let substring = str2.substring(j,j+i);
            if(str1.includes(substring)){
                return substring
            }
        }
    }
}
// 二叉树前序中序后序遍历
function fn(root) {
    console.log(root.val);
    if(root.left){
        fn(root.left)
    }
    if(root.right){
        fn(root.right)
    }
}
// 二叉树层序遍历
function fn(root){
    let res = [];
    let tree = [];
    tree.push(root);
    while(tree.length){
        let node = tree.shift();
        res.push(node.val);
        if(node.left){
            tree.push(node.left);
        }
        if(node.right){
            tree.push(node.right)
        }
    }
    return res;
}
// 获取二叉树最大深度
function fn(root){
    const handle = (node,deep) => {
        if(!node){
            return deep
        }
        let left = handle(node.left,deep+1);
        let right = handle(node.right,deep+1);
        return Math.max(left,right)
    }
    return handle(root,0)
}
// 输出二叉树左视角可以看到的视点
function fn(root){
    let res = [];
    const handle = (node,index) => {
        if(!node){
            return
        }
        if(!res[index]){
            res[index] = node.val;
        }
        handle(node.left,index+1);
        handle(node.right,index+1);
    }
    handle(root,0);
    return res;
}
// 给一颗二叉树和一个值，检查二叉树中是否存在一条路径，这条路径上所有值得和加起来等于这个给定的值，输出路径
function fn(root,sum){
    let curSum = 0;
    let path = [];
    let res = [];
    function handle(root,sum,curSum,path,res) {
        curSum += root.val;
        path.push(root.val);
        if(curSum === sum && !root.left && !root.right){
            res.push(path.slice());
        }
        if(root.left){
            handle(root.left,sum,curSum,path,res);
        }
        if(root.right){
            handle(root.right,sum,curSum,path,res);
        }
        // 相当于触碰到二叉树的底部后没有达成条件 然后返回上一层再次计算
        path.pop();
    }
    handle(root,sum,curSum,path,res);
    return res;
}
// 判断数组B是不是数组A的子集
function fn(arr1,arr2) {
    while (arr1.length){
        return arr2.includes(arr1.pop());
    }
    return false
}
// 不借助第三方变量交换两个值
function fn(a,b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a,b];
}
// 数组全排
function fn(arr){
    let res = [];
    let cur = [];
    function handle(arr) {
        let init;
        for(let i = 0;i<arr.length;i++){
            init = arr.splice(i,1)[0];
            cur.push(init);
            if(arr.length === 0){
                res.push(cur.slice())
            }
            handle(arr);
            arr.splice(i,0,init);
            cur.pop();
        }
        return res;
    }
    return handle(arr)
}
// 两个超大整数加法运算
function add(a,b){
    let res = '';
    let temp = 0;
    a = a.split('');
    b = b.split('');
    while(a.length || b.length || temp){
        temp += ~~a.pop() + ~~b.pop();
        res = temp % 10 + res;
        temp = temp > 9;
    }
    return res;
}
// 多个异步并发控制，批量请求数据，通过max参数控制并发，当所有请求结束后执行callback函数
function sendRequest(urls,max,cb){
    let curIndex = 0;
    let urlsObj ={};
    let times = Math.ceil(urls.length / max);
    for(let i = 0;i<times;i++){
        urlsObj[i] = urls.slice(i*max,(i+1)*max);
    }
    let getFetch = (source) => {
        return source.map((item) => {
            return fetch(item).then((res) => {
                return res.blob();
            })
        })
    }
    let send = () => {
        urlsObj[curIndex] && Promise.all(getFetch(urlsObj[curIndex])).then((res) => {
            curIndex++;
            console.log(`第${curIndex}个请求`,res);
            if(curIndex === times){
                cb();
            }
            send();
        })
    }
    send();
}
// 实现如下函数，批量请求数据，通过max参数控制并发，要实现先发送max个，其中返回一个就向http队列中追加一个，以此类推，最后将结果全部返回
function handleRequest(arr,max,cb){
    let ajaxNum = 0;
    let length = arr.length;
    let result = [];

    const getFetch = (url) => {
        return new Promise((resolve) => {
            fetch(url).then((res) => {
                resolve(res.blob());
            })
        })
    }

    const handle = (urls) => {
        while(ajaxNum <= max && urls.length){
            ajaxNum++;
            getFetch(urls.shift()).then((res) => {
                result.push(res);
                handle(urls);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                ajaxNum--;
                result.length === length && typeof cb === 'function' && cb(result);
            })
        }
    }
    handle(arr);
}
// 实现一个简单版的promise

function myPromise(constructor){
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onResolveQueue = [];
    self.onRejectQueue = [];

    function resolve(value){
        if(self.status === 'pending'){
            self.status = 'resolve';
            self.value = value;
            setTimeout(() => {
                self.onResolveQueue.forEach(resolve => resolve(value));
            }, 0);
        }
    }

    function reject(reason){
        if(self.status === 'pending'){
            self.status = 'reject';
            self.reason = reason;
            setTimeout(() => {
                self.onRejectQueue.forEach(reject => reject(reason));
            }, 0);
        }
    }

    try{
        constructor(resolve,reject);
    }catch(e){
        reject(e);
    }
}

myPromise.prototype.then = function(onFulfilled,onRejected){
    if(this.status === 'resolve'){
        onFulfilled(this.value);
    }else if(this.status === 'reject'){
        onRejected(this.reason);
    }else if(this.status === 'pending'){
        this.onResolveQueue.push(onFulfilled);
        this.onRejectQueue.push(onRejected);
    }
    return this;
}
// 实现 promiseAll
function promiseAll(arr){
    return new Promise((resolve,reject) => {
        let count = 0;
        let resArr = [];
        for(let i = 0;i<arr.length;i++){
            arr[i].then((res) => {
                count++;
                resArr.push(res);
                if(count === arr.length){
                    return resolve(resArr);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    })
}
// 实现 promiseRace
function promiseRace(arr){
    return new Promise((resolve,reject) => {
        arr.forEach((item) => {
            item.then(resolve,reject);
        })
    })
}
// 中间自适应 两列宽度固定布局
/**
 * .container{
            display: flex;
        }
        .left,.right{
            width: 200px;
            height: 500px;
        }
        .left{
            background: red;
        }
        .right{
            background: green;
        }
        .middle{
            background: gray;
        }
        .middle{
            flex-grow: 1;
        }
 */
/**
 * .middle{
            width: 100%;
            height: 200px;
            background: gray;
            padding: 0 200px;
        }
        .left{
            position: absolute;
            top: 0;
            left: 0;
            width: 200px;
            height: 200px;
            background: red;
        }
        .right{
            position: absolute;
            top: 0;
            right: 0;
            width: 200px;
            height: 200px;
            background: green;
        }
 */
// 元素水平垂直居中
/**
 *  1、父元素
 *  display: flex;
    justify-content: center;
    align-items: center;

    2、子元素
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px;

    3、子元素
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    4、父元素
    display: table-cell;
    vertical-align: middle;
    子元素
    margin: 0 auto;

    5、子元素
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
 */

 //实现这样一个布局，无论外层容器宽高如何变化，黄色区域始终相对于外层容器垂直居中，左右各相距20px，同时黄色区域的高度始终为自身宽度的50%
 /**
  * .container{
        width: 500px;
        height: 500px;
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .main{
        width: 100%;
        padding-top: 50%;
        background: yellow;
    }
  */
 // 硬币找零  贪心算法
 function coinChange(arr,val){
    arr = arr.sort((a,b) => {
      return b - a;
    })
    let res = [];
    let sum = 0;
    function handle(val){
      for(let i = 0;i<arr.length;i++){
        if(sum + arr[i] <= val){
          res.push(arr[i]);
          sum += arr[i];
        }
      }
    }
    handle(val);
    return res;
  }
  // 简易jsonp
  function jsonp(url,cb){
    const script = document.createElement('script');
    script.src = `${url}&cb=${cb}`;
    document.body.appendChild(script);
    window[cb] = (res) => {
        console.log(res)
    }
}
// 求数组连续子数组的最大和
function fn(arr){
    let sum = arr[0];
    let max = arr[0];
    for(let i = 1;i<arr.length;i++){
        sum = Math.max(sum+arr[i],arr[i]);
        max = Math.max(sum,max);
    }
    return max;
}
// 单例模式例子  全局modal
const createModal = (function(){
    let modal = null;
    return function(content){
        if(!modal){
            modal = document.createElement('div');
            modal.id = 'modal';
            modal.style.display = 'none';
            modal.innerHTML = content;
            document.body.appendChild(modal);
        }
        return modal
    }
})()
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
function fn(arr,s){
    let minLength = Infinity;
    let i = 0;
    let j = 0;
    let sum = 0;
    while(i<arr.length){
        sum += arr[i];
        while(sum >= s){
            minLength = Math.min(minLength,i-j+1);
            sum -= arr[j];
            j++;
        }
        i++;
    }
    return minLength === Infinity ? 0 : minLength;
}
//给定一组非负整数 nums，重新排列它们每个数字的顺序（每个数字不可拆分）使之组成一个最大的整数。注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
function fn(arr){
    arr.sort((a,b) => {
        let num1 = `${a}${b}`;
        let num2 = `${b}${a}`;
        return num2 - num1;
    });
    return arr.length ? arr.join('') : '0';
}
//找出字符串中连续出现最多的字符和个数
function fn(str){
    let strArr = str.split('');
    let s = strArr[0];
    let res = [];
    for(let i = 1;i<=strArr.length;i++){
        if(s.indexOf(strArr[i]) !== -1){
            s += strArr[i]
        }else{
            res.push(s);
            s = strArr[i]
        }
    }
    res = res.sort((a,b) => {
        return b.length - a.length;
    })
    return `连续字符串${Array.from(new Set(res[0]))[0]}出现次数最多，${res[0].length}次`
}
// 回文字符串
function fn(str){
    let str1 = str.toLowerCase();
    let str2 = str1.split('').reverse().join('');
    return str1 === str2;
}















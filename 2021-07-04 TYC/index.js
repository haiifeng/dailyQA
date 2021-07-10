// 天眼查

隐藏元素方式

事件循环
定义
微任务
宏任务
事件循环机制从整体上告诉了我们 JavaScript 代码的执行顺序 Event Loop即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。
先执行 Script 脚本，然后清空微任务队列，然后开始下一轮事件循环，继续先执行宏任务，再清空微任务队列，如此往复。
宏任务：Script/setTimeout/setInterval/setImmediate/ I/O / UI Rendering
微任务：process.nextTick()/Promise
上诉的 setTimeout 和 setInterval 等都是任务源，真正进入任务队列的是他们分发的任务。

优先级

setTimeout = setInterval 一个队列
setTimeout > setImmediate 
process.nextTick > Promise

for (const macroTask of macroTaskQueue) {  
  handleMacroTask();    
  for (const microTask of microTaskQueue) {    
  	handleMicroTask(microTask);  
  }
}


盒模型
1. W3C 标准盒模型：
属性width,height只包含内容content，不包含border和padding。
2. IE 盒模型：
属性width,height包含border和padding，指的是content+padding+border。
在ie8+浏览器中使用哪个盒模型可以由box-sizing(CSS新增的属性)控制，默认值为content-box，即标准盒模型；如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6,7,8中DOCTYPE缺失会触发IE模式。在当前W3C标准中盒模型是可以通过box-sizing自由的进行切换的。


new的过程
箭头函数盒普通函数的区别
var和let const的区别

基本类型(原始值类型) 栈，直接存储在栈(stack)中的简单数据段
引用类型 堆,存储在堆(heap)中的对象

浏览器tab之间的通信

cookie过期时间

html渲染流程
回流和重绘

301和302区别

promise状态

react diff算法

iframe的优缺点
iframe的优点：
iframe能够原封不动地把嵌入的网页展现出来。
如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。
如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。

iframe的缺点：
会产生很多页面，不容易管理。
iframe框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。
代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理iframe中的内容，所以使用iframe会不利于搜索引擎优化。
很多的移动设备（PDA手机）无法完全显示框架，设备兼容性差。
iframe框架页面会增加服务器的http请求，对于大型网站是不可取的。


// 数组扁平化


//根据个个位排序，然后根据十位排序
const arr=[213, 475, 71, 22, 151, 5234];

function sortArr(arr,tag=1){
    for(let ii=1;ii<=tag;ii++){
        arr.sort((a,b)=>{
            let aa=String(a).split('')[String(a).split('').length-ii];
            let bb=String(b).split('')[String(b).split('').length-ii];
//             console.log(aa,bb)
//             if(String(a).split('')[String(a).split('').length-ii]==String(b).split('')[String(b).split('').length-ii]){
//                 return 
//             }
            return aa-bb
        })
    } 
    
    return arr;
}

console.log(JSON.stringify(sortArr(arr)))
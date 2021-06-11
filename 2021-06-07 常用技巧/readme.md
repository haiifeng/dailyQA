## 常用技巧
- 1、  css 一行文本超出隐藏
```
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

- 2、css 多行文本溢出隐藏
```
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

- 3、 IOS 手机容器滚动条滑动不顺畅
```
overflow: auto;
-webkit-overflow-scrolling: touch;
```

- 4、修改滚动条样式,隐藏 div 元素的滚动条
```
div::-webkit-scrollbar {
    display: none;
}
```

- 5、解决 ios audio /  video 无法自动播放、循环播放的问题
```
// 解决ios audio无法自动播放、循环播放的问题
var music = document.getElementById('video');
var state = 0;

document.addEventListener('touchstart', function(){
    if(state==0){
        music.play();
        state=1;
    }
}, false);

document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);

//循环播放
music.onended = function () {
    music.load();
    music.play();
}
```

- 6、去除图片底边3像素的问题
```
img { 
    vertical-align:middle
}
```

- 7、contenteditable
```
contenteditable="true" 可以将标签变成可编辑状态。

<div contenteditable="true"></div>
```

- 8、CSS 中 calc() 方法,此属性能适应自适应的布局。
```
div {
    width: calc(50% - 20px);
}
```

- 9、解析 get  参数
通过 replace 方法获取 url 中的参数键值对，可以快速解析 get 参数。
```
const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q);
```

- 10、解析连接 url
创造 a 标签，给 a 标签赋值 href 属性的方式，获取到协议，pathname，origin等 location 对象上的属性。
```
// 创建a标签
const aEle = document.createElement('a');
// 给a标签赋值href路径
aEle.href = '/test.html';
// 访问aEle中的属性
aEle.protocol; // 获取协议
aEle.pathname; // 获取path
aEle.origin;
aEle.host;
aEle.search;
```
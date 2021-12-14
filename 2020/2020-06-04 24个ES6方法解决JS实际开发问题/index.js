//操作DOM的工具库
export default {
    //隐藏指定的所有元素
    //from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。
    hide: (el) => Array.from(el).forEach(e => (e.style.display = 'none')),

    //检查元素是否具有制定的类
    hasClass: (el, className) => el.classList.contains(className),

    //切换一个元素的类
    toogleClass: (el, className) = el.classList.toggle(className),

    //获取当前页面的滚动位置
    getScrollPosition: (el = window) => ({
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
    }),

    //平滑滚动到页面顶部
    // window.requestAnimationFrame()  
    // 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
    // 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
    // requestAnimationFrame：优势：由系统决定回调函数的执行时机。
    // 60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿。
    scrollToTop: () => {
        c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    },

    //检查父元素是否包含子元素
    elementContains: (parent, child) => parent !== child && parent.contains(child),

    //检查指定元素在视口中是否可见
    // partiallyVisible?全屏(上下左右)可见:左右可见
    elementIsVisibleInViewport: (el, partiallyVisible = false) => {
        const {
            top,
            left,
            bottom,
            right
        } = el.getBoundingClinetRect();
        const {
            innerHeight,
            innderWidth
        } = window;
        return partiallyVisible ?
            ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight) || (left > 0 && left < innderWidth) || (right > 0 && right < innderWidth)) :
            (top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth);
    },

    //获取元素中的所有图像
    // includeDuplicates?排除重复元素的数组:全部数据组成的数组
    getImages: (el, includeDuplicates = false) => {
        images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'));
        return includeDuplicates ? [...new Set(images)] : images;
    },

    //确定设备时移动设备还是台式机/笔记本电脑
    detectDeviceType: () => {
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
            'Mobile' :
            'Desktop';
    },

    //获取当前URL
    currentURL = () => window.location.href,

    //创建一个包含当前URL参数的对象
    getURLParameters: url =>
        (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
            (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}
        ),

    //将一组表单子元素转化为对象
    formToObject = form => Array.from(new FormData(form)).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
    }), {}),

    //根据给定的选择器,从对象中返回选择器对应的值
    // const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
    // getValueByKeyFromObject(obj, 'selector.to.val', 'target[0]', 'target[2].a'); 
    // ['val to select', 1, 'test']
    getValueByKeyFromObject = (from, ...selectors) => [...selectors].map(s =>
        s
        .replace(/\[([^\\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur].form)
    ),

    //在等待指定时间后调用提供的函数
    delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args),

    //在给定元素上出发特定事件且能选择地传递自定义数据
    // triggerEvent(document.getElementById('myId'), 'click');
    // triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
    triggerEvent = (el, enentType, detail) => el.dispatchEvent(new CustomEvent(eventType, {
        detail
    })),

    //自定义事件的函数有 Event、CustomEvent 和 dispatchEvent;
    // 向 window 派发一个resize内置事件
    // window.dispatchEvent(new Event('resize'))
    // 直接自定义事件，使用 Event 构造函数：
    // var event = new Event('build');
    // var elem = document.querySelector('#id')
    // // 监听事件
    // elem.addEventListener('build', function (e) { ... }, false);
    // // 触发事件.
    // elem.dispatchEvent(event);
    // CustomEvent 可以创建一个更高度自定义事件,还可以附带一些数据,具体用法如下：
    // var myEvent = new CustomEvent(eventname, options);
    // 其中 options 可以是：
    // {
    //  detail: {
    //   ...
    //  },
    //  bubbles: true,  //是否冒泡
    //  cancelable: false //是否取消默认事件
    // }
    // 其中 detail 可以存放一些初始化的信息，可以在触发的时候调用。其他属性就是定义该事件是否具有冒泡等等功能。
    // 内置的事件会由浏览器根据某些操作进行触发，自定义的事件就需要人工触发。 dispatchEvent 函数就是用来触发某个事件：
    // element.dispatchEvent(customEvent);
    // 上面代码表示,在 element 上面触发 customEvent 这个事件。
    //   // add an appropriate event listener
    // obj.addEventListener("cat", function(e) { process(e.detail) });

    // // create and dispatch the event
    // var event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}});
    // obj.dispatchEvent(event);

    //从元素中移除事件监听器
    off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts),

    //获得给定毫秒数的可读格式
    formatDuration = ms => {
        if (ms < 0) ms = -ms;
        const time = {
            day: Math.floor(ms / 86400000),
            hour: Math.floor(ms / 3600000) % 24,
            minute: Math.floor(ms / 60000) % 60,
            second: Math.floor(ms / 1000) % 60,
            millisecond: Math.floor(ms) % 1000
        };
        return Object.entries(time)
            .filter(val => val[1] !== 0)
            .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
            .join(', ');
    },

    //获得两个日期之间得差异（一天为单位）
    getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 60 * 60 * 24),

    //向传递得URL发GET请求
    // httpGet(
    //     'https://jsonplaceholder.typicode.com/posts/1',
    //     console.log
    // );
    // {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}
    httpGet = (url, callback, err = console.error) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => callback(request.responseText);
        request.onerror = () => {
            err(request)
        };
        request.send();
    },

    //对传递得URL发POST请求
    // const newPost = {
    //     userId: 1,
    //     id: 1337,
    //     title: 'Foo',
    //     body: 'bar bar bar'
    // };
    // const data = JSON.stringify(newPost);
    // httpPost(
    //     'https://jsonplaceholder.typicode.com/posts',
    //     data,
    //     console.log
    // )
    httpPost = (url, data, callback, err = console.error) => {
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onload = () => callback(request.responseText);
        request.onerror = () => err(request);
        request.send(data);
    },

    //为指定选择器创建具有指定范围,步长和持续时间的计数器
    // counter('#my-id', 1, 1000, 5, 2000);
    // 让 `id=“my-id”`的元素创建一个2秒计时器
    counter = (selector, start, end, step = 1, duration = 2000) => {
        let current = start,
            _step = (end - start) * step < 0 ? -step : step,
            timer = setInterval(() => {
                current += _step;
                document.querySelector(selector).innerHTML = current;
                if (current >= end) document.querySelector(selector).innerHTML = end;
                if (current >= end) clearInterval(timer);
            }, Math.abs(Math.floor(duration / (end - start))));
        return timer;
    },

    //将字符串复制到剪贴板
    // copyToClipboard('Lorem ipsum');
    // 'Lorem ipsum' copied to clipboard
    copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    },

    //判断页面的浏览器选项卡是否聚焦
    isBrowserTabFocused = () => !document.hidden,

    //Node创建目录 (如果不存在)
    createDirIfNotExists = () => {
        const fs = require('fs');
        const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);
    }
}
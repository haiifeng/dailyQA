# html2canvas踩坑记录
## 需求描述
现在项目有这么一个需求，App里引用的是前端页面，App分享到小程序需要使用封面图，封面图内容为前端页面截图。
## 解决方案
### 方案一，html2canvas  
- 使用[html2canvas](https://github.com/niklasvh/html2canvas)将html转成base64格式的png图片
- 用法简介
    1. 下载安装，`npm install html2canvas`或者直接引下载后的[本地文件](https://github.com/niklasvh/html2canvas/releases)
    2. 引入，`import html2canvas from 'html2canvas';`
    3. 使用：
    ``` 
        html2canvas(document.body).then(function(canvas) {
            //document.body.appendChild(canvas);
            canvas.toDataURL()
        });
    ```
- 遇到的问题：
    1. html2canvas的dom节点参数会将整个节点的内容都画到canvas上，但是我们其实并不关心顶部的返回按钮，页面标题，分享按钮，如下图所示的顶部区域。
    ![截图示例](./images/img1.jpg)
    2. 在 `.toDataURL()` 的时候报图片跨域问题，需要配置选项 `useCORS:true`，同时后端支持跨域。由于公司后端配置支持跨域不太灵活，方案GG。
- 结论：该方案不太合适
- 原理简介
    - 将要截图的dom克隆一份，当成目标模板，递归取出目标模版的所有DOM节点，填充到一个rederList，并附加是否为顶层元素/包含内容的容器 等信息
    - 同时使用getComputedStyle方法，根据z-index postion float等css属性和元素的层级信息将rederList排序，计算出一个canvas的renderQueue，类似于一个VirtualDom的对象。
    - 遍历renderQueue，将css样式转为setFillStyle可识别的参数，依据nodeType调用相对应canvas方法，如文本则调用fillText，图片drawImage，设置背景色的div调用fillRect等
### 方案三，根据ui图画canvas
- 针对方案一的缺点
    1. 根据UI图定制分享截图，和前端页面同数据源
    2. 使用本地图片，比如背景图，图标等
- htm2canvas4mp类库
    1. 获取屏幕宽高
    ```
    /**
     * getClinetWH 获取屏幕可视区域的宽高
     * 小程序要求截图长款比为5：4
     */
    function getClinetWH() {
        return {
            width:document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
    }
    ```
    1. 渲染文本
    - `options.overflow`为最多展示多少字符，超出后省略
    - `options.maxWidth`为最大宽度，超出后隐藏
    ```
    function renderText(ctx, options) {
        ctx.fillStyle = options.fillStyle || "transparent";
        ctx.font = options.font || "16px Arial";
        //限制字数
        if (options.overflow && options.overflow > 0 && options.text.length >= options.overflow) {
            options.text = options.text.substr(0, options.overflow) + '...';
        }
        //限制宽度
        if (options.maxWidth && options.maxWidth > 0 && ctx.measureText(options.text).width > options.maxWidth) {
            let currentWidth = 0;
            for (let i = 0; i < options.text.length; i++) {
                currentWidth += ctx.measureText(options.text[i]).width
                if (currentWidth > options.maxWidth) {
                    options.text = options.text.substr(0, i);
                    break;
                }
            }
        }
        ctx.fillText(options.text, options.x, options.y);
        return ctx;
    }
    ```
    1. 渲染图片
    ```
    function renderImage(ctx, options = {}, callback = console.log) {
        var image = new Image();
        var timeStamp = +new Date();
        image.setAttribute("crossOrigin", 'anonymous');
        image.src = options.src + '?' + timeStamp;
        image.onload = function () {
            ctx.globalCompositeOperation = 'source-over';
            if (options.globalCompositeOperation) {
                ctx.globalCompositeOperation = options.globalCompositeOperation;
            }
            ctx.drawImage(image, options.dx || 0, options.dy || 0, options.dw || image.width, options.dh || image.height);
            callback()
        }
        image.onerror = function () {
            //图片加载出错，加载默认图片
            console.log('图片加载出错，加载默认图片')
            try {
                renderImage(ctx, {
                    ...options,
                    src: options.errorImg ||
                        'http://cdn.xdf.cn/souke/h5-pages/pages/school-detail/images/default-img.svg'
                });
            } catch (error) {
                console.log('加载默认图片出错', error)
            }
    
        }
        return ctx;
    }
    ```
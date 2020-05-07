# 2019-08-30
- 统计一个页面里，所有引用外部文件所使用的协议，最终绘制成表格

- 先执行下面代码：
```
    var script=document.createElement("script");
    script.src='http://file.xdf.cn/neworiental/chf/test/index.js';
    script.type='text/javascript';
    document.getElementsByTagName("body")[0].appendChild(script);
    
```
执行` AP=AnalyzeProtocol() `初始化统计，得到AP 为所统计的所有数据
执行` AP.testHttp2Https() `测试将http文件转成https并添加到网站，然后在console控制台看报错
 # 类数组的length问题
 ## 代码示例
 ```
  var obj = {
      "2" : 3,
      "3" : 4,
      "length" : 2,
      "splice" : Array.prototype.splice,
      "push" : Array.prototype.push
  }
  obj.push(1)
  obj.push(2)
  console.log(obj)
```
执行上面代码，得到下面结果
![执行结果](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7238434106349fa9ad54c6ff4961eb7~tplv-k3u1fbpfcp-zoom-1.image)

## push的知识点
来看一下V8引擎中的Array.prototype.push()的源码（代码来自《Javascript设计模式与开发实践》）
```
function ArrayPush () {
  var n = TO_UNIT32(this.length);
  var m = %_ArgumentsLength();
  for (var i = 0; i < m; i++) { // 逐个复制元素
    this[i + n ] = %_Arguments(i);
  }
  this.length = n + m; // 修改数组的length
  return this.length;
}
```
当push多个元素时时这样的： `this[i + n ] = %_Arguments(i);` 

单独push一个元素就是这样的：
``` 
arr.push[param]
// 等价于 arr[arr.length]=param
```
## 代码解析
```
obj.push(1)
obj.push(2)
 ```
 其实就是
 ```
 obj[2]=1;//obj.length=3
 obj[3]=1;//obj.length=4
 ```
直接覆盖原来对象值了
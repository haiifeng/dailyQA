// 三.58
// 1.async await promise 打印相关题目
// 2.settimeout for循环打印 闭包相关题目
// 3.for循环正则替换
// 4.移动端兼容 hash history路由区别  移动端 touch click执行顺序
// touchStart->touchMove->touchEnd->touchCancel->click
// hash模式是通过改变锚点(#)来更新页面URL，并不会触发页面重新加载，我们可以通过window.onhashchange监听到hash的改变，从而处理路由。
// history模式是通过调用window.history对象上的一系列方法来实现页面的无刷新跳转。


// 5.斐波那契数列
function fib(n) {
    if (n == 0) {
        return 0;
    }
    if (n = 1) {
        return 1;
    }
    return fib(n - 1) + fib(n)
}

// 6.左右括号匹配算法
// 7.1-100 依次报号1-3 3淘汰 一次循环，问剩下几号（约瑟夫环问题）
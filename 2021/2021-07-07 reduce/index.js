// Array.prototype.reduce(fn[,initialValue])
// reduce 接收 2 个参数：第一个参数是回调函数 fn（必选），第二个参数是初始值 initialValue（可选）

// fnj接受下面4个参数
// Accumulator (acc) (累计器)
// Current Value (cur) (当前值)
// Current Index (idx) (当前索引)
// Source Array (src) (源数组)

// 不带初始值
[1,2,3,4].reduce((acc, cur) => {
  return acc + cur
})
// 1 + 2 + 3 + 4
// 10

// 带初始值
[1,2,3,4].reduce((acc, cur) => {
  return acc + cur
}, 10)
// 10 + 1 + 2 + 3 + 4
// 20


// 比如数组扁平化
function flatenArr(arr) {
    return arr.reduce((acc, next) => {
        return acc.concat(Array.isArray(next) ? fn(next) : next);
    }, [])
}
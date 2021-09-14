1.JS事件循环
为什么会有事件循环机制
2css，有一个 按钮，当鼠标hover的时候向上移动5px怎么实现
2.1.button::hover{ position: relative; top: -5px }
2.2.button::hover{ Transform: translateY(-5px) }
两种优缺点，兼容性的话使用相对定位，执行效率的话使用动画
3.有三个img标签，中间有空白间隙，为什么？
img标签默认是inline - block，所以会有间隙。通过设置display: block或者float: left来解决
react里userRef有什么作用？获取节点，？
react里setState之后做了什么操作？
react里userMeno和useCallback区别 ?
    react里父组件变了，子组件会不会更新？怎么阻止子组件变化？
说说react组件化，比如说如何设计一个菜单组件

const myPromse = Promise.resolve(Promise.resolve('A'))
function funcA() {
    myPromse.then(res => res).then(res => { console.log(res) })
    setTimeout(() => {
        console.log('B')
    }, 0)
    console.log('C')
}
async function funcB() {
    const res = await myPromse.then(res => res)
    console.log(await res)
    setTimeout(()=>{
        console.log('D')
    },0)
    console.log('E')
}
funcA()
funcB()

let person = { name: 'Lydia' }
const members = [person]
person = null
console.log(members)//[{}]

// 实现一个reduce函数
Array.protoType._reduce = function (callback, init) {
    if (!init) { init = [] }
    //sum,current,this
    for (let ii = 0; ii < this.length; ii++) {
        init = callback(init, this[ii], this);
    }
    return init;
}

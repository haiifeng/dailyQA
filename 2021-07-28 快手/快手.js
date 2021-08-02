// ES6 ES7
// 网络相关
// 浏览器底层 


// 二叉树找出树中所有节点的个数，节点结构如图代码所示，补完countsNodes部分
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function countsNodes(root) {
    //     const currentCount=root.reduce((sum,cur)=>{
    //         if(cur.left){
    //             sum=countsNodes(cur.left)
    //         }
    //         if(cur.right){
    //             sum=countsNodes(cur.right)
    //         }
    //         return sum;
    //     },1)
    //     return currentCount;

    let num = 0;
    //     if(root){
    //         num++;
    //     }
    if (root.left) {
        num++;
        num += countsNodes(root.left);
    }
    if (root.right) {
        num++;
        num += countsNodes(root.right);
    }
    return num;
}

// 函数柯里化
function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 curry 函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2) // 3

function addCurry(f) {
    //     return function g(){
    //         return g(f(arguments))
    //     }
    return (...rest) => {
        rest.reduce((sum, cur) => {
            sum = f(sum, cur);
        }, 0)
    }
}


//发布订阅模式
// 实现EventEmitter类， 需要实现on, off, once, emit几个方法

接口样式
on(eventName, fn);
off(eventName, fn ? ); // 不传 fn 清理全部
emit(eventName);
once(eventName, fn);

const E = new EventEmitter();
const fnA = () => console.log('a')
const fnA1 = () => console.log('a1')
const fnB = () => console.log('b');
const fnB1 = () => console.log('b1');

E.on('a', fnA) //绑定
E.emit('a') // 触发 ‘a'
E.off('a') // 解绑所有
E.emit('a') // 再触发没有效果

E.on('a', fnA)
E.on('a', fnA1)
E.emit('a') // call fnA fnA1
E.off('a', fnA1) // remove fnA1 only
E.emit('a') // call fnA

E.on('b', fnB)
E.once('b', fnB1);
E.emit('b') // b b1
E.emit('b') // only b
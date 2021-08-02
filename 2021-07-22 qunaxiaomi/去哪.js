// 去哪

// 问题1
function A1() {}
A1.prototype.x = 1;
let a1 = new A1();
A1.prototype = {
    x: 2
};
let a2 = new A1();
console.log('a1.x', a1.x); //1
console.log('a2.x', a2.x); //2
// a1.__proto__ {x: 1, constructor: ƒ}
// a2.__proto__ {x: 2}

// 问题2
const A2 = function () {
    let arr = [];
    for (var i = 0; i < 5; i++) {
        arr.push(function () {
            return i * i;
        })
    }
    return arr;
}
const a3 = A2();
console.log(a3[0]()); // 25
console.log(a3[1]()); // 25

// 改版1 使用let变量
const A21 = function () {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(function () {
            return i * i;
        })
    }
    return arr;
}
const a31 = A21();
console.log(a31[0]()); // 0
console.log(a31[1]()); // 1

//改版2 使用自执行函数
const A22 = function () {
    let arr = [];
    for (var i = 0; i < 5; i++) {
        (function (params) {
            arr.push(function () {
                return params * params;
            })
        })(i)
    }
    return arr;
}
const a32 = A22();
console.log(a32[0]()); // 0
console.log(a32[1]()); // 1

// 3.react事件机制
// 4.redux和mobx的优缺点
// 5.react节点之间怎么通信
// 6.圣杯布局


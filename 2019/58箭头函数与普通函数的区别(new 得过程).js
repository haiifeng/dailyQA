/*
 * 2019-04-18
 * 第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？
 */

// 箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有一下几点差异：
// 1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
// 2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以使用rest参数代替。 
// 3、不可以使用yield命令，因为箭头函数函数不能用作Generator函数。
// 4、不能使用new命令，因为
//     没有自己的this，无法调用call，apply。
//     没有prototype属性，而new命令在执行的时候需要将构造函数的prototype赋值给新的对象的__proto__


// new过程大致是这样的：
function newFunc(father, ...rest) {
    var result = {};
    result.__proto__ = father.prototype;
    var result2 = father.apply(result, rest);
    if ((typeof result2 == 'object' || typeof result2 == 'function') && result2 !== null) {
        return result2;
    }
    return result;
}

sum(1).count() // 1
sum(1)(2).count() //1+2
sum(1)(2)(3).count() // 1+2+3

function sum(...args){
    const f=(...rest)=>sum(...args,...rest);
    f.count=()=>[...args].reduce((a,b)=>a+b,0);
    return f;
}


// 扁平数据结构转Tree
let arr = [{
        id: 1,
        name: '部门1',
        pid: 0
    },
    {
        id: 2,
        name: '部门2',
        pid: 1
    },
    {
        id: 3,
        name: '部门3',
        pid: 1
    },
    {
        id: 4,
        name: '部门4',
        pid: 3
    },
    {
        id: 5,
        name: '部门5',
        pid: 4
    },
]
// [
//     {
//         "id": 1,
//         "name": "部门1",
//         "pid": 0,
//         "children": [
//             {
//                 "id": 2,
//                 "name": "部门2",
//                 "pid": 1,
//                 "children": []
//             },
//             {
//                 "id": 3,
//                 "name": "部门3",
//                 "pid": 1,
//                 "children": [
//                     // 结果 ,,,
//                 ]
//             }
//         ]
//     }
// ]

function arrayToTree(arr, pid = 0) {
    return arr.reduce((sum, cur) => {
        if (cur.pid == pid) {
            cur.children = arrayToTree(arr, cur.id)
            sum.push(cur);
        }
        return sum;
    }, [])
}

function arrayToTree(array, pid) {
    let result = []
    array.forEach(item => {
        if (item.pid == pid) {
            item.children = arrayToTree(array, item.id)
            result.push(item)
        }
    })
    return result
}

function getTreeGenerateFn() {
    const root = {
        children: []
    }
    return function TreeGenerate(arr, child = root.children) {
        let curr = null
        let prevPid = -1
        while (arr.length) {
            if (prevPid >= 0 && arr[0].pid >= 0 && arr[0].pid > prevPid) {
                return TreeGenerate(arr, child.slice(-1)[0].children)
            }
            curr = arr.shift()
            curr.children = []
            child.push(curr)
            prevPid = curr.pid
        }
        return root.children
    }
}

function arrayToTree(items) {
    const result = []; // 存放结果集
    const itemMap = {}; // 
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;

        if (!itemMap[id]) {
            itemMap[id] = {
                children: [],
            }
        }

        itemMap[id] = {
            ...item,
            children: itemMap[id]['children']
        }

        const treeItem = itemMap[id];

        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}
// react-router

// www.yuanfudao.com

// /path/page

// hash/history URL

// hash
// www.yuanfudao.com/#/// 
// history
// www.yuanfudao.com/path/pa


// nodejs文件系统和webpack打包

// eggsjs的内容


// 打印题目
function add(x, y) {
    console.log(1)
    setTimeout(function () {
        console.log(2)
    }, 1000)
}
add();
setTimeout(function () {
    console.log(3)
})
new Promise(function (resolve) {
    console.log(4)
    setTimeout(function () {
        console.log(5)
    }, 100)
    for (var i = 0; i < 100; i++) {
        i == 99 && resolve()
    }
}).then(function () {
    setTimeout(function () {
        console.log(6)
    }, 0)
    console.log(7)
})
console.log(8)

// 1
// 4 
// 8
// 7 
// 3
// 6
// 5
// 2

// Promise.retry
// 接受一个promise对象p和次数n
// 如果在n次内p返回了fulfilled则直接返回response
// 如果n次之后还是rejected，则返回error
function promieseRetry(p, n) {
    if (!p) {
        return null;
    }
    let result = false;
    while (n && !result) {
        return new Promise((a, b) => {
            p.then((res) => {
                result = true;
                a(res)
            }).catch((err) => {
                n--;
                b(err)
            })
        });
    }
}

// const arr=new Array(n).map(()=>{})
// return Promise.race((arr);
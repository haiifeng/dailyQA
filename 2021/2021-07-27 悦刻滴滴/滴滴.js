var a = 0,
    b = 0;

function A(a) {
    A = function (b) {
        alert(a + b++);
    }
    alert(a++);
}
A(1);
A(2);


const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    reject()
})
setTimeout(() => {
    console.log(5)
}, 0)
promise.then(() => {
    console.log(3)
}).then(() => {
    console.log(6)
}).catch(() => {
    console.log(7)
})
console.log(4)
// 1
// 4
// 3，
// 6，
// 5


// 实现一个函数 find(obj, str)，满足:
var obj = {
    a: {
        b: {
            c: 1
        }
    }
};

function a1(obj, str) {
    const result = str.split('').reduce((sum, current) => {
        if (!sum) {
            return undefined
        }
        return obj[current]
    }, {})
    return Object.entries(result)[1];
}

find(obj, 'a.b.c') //1
find(obj, 'a.d.c') //undefined


function deepClone(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    let temp = {};
    for (let key in obj) {
        if (typeof obj(key) == 'object') {
            temp[key] = deepClone(obj[key])
        } else {
            temp[key] = obj[key]
        }
    }
    return temp;
}
console.log(deepClone(obj));
// 找出这个数组中出现次数最多的一项及这一项出现了多少次
const arr = [1, 2, 1, 2, '1', '1', '2', '2', 1, '2', '2', 4, 5, 6];

function getKey(arr) {
    let map = new Map();
    arr.forEach(item => {
        if (!map.keys.includes(item)) {
            map.set(item, 1);
        } else {
            map.set(item, map.get(item) ++);
        }
    });
    let a;
    for (let key in map) {
        if (!a) {
            a = key
        } else {
            if (map.get(a) < map.get(key)) {
                a = key;
            }
        }
    }

    // const arr1 = Object.create(map).ertries().sort((a, b) => a[1] - b[1]);
    // return arr[arr.length - 1];

    return {
        key: a,
        nums: map.get(a)
    }
}

// 求给定数组arr中n个数相加之和为sum的所有可能集合
function fn(arr, n, sum) {

}
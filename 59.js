/*
 * 第 59 题：给定两个数组，写一个方法来计算它们的交集。
 * 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
 */
let nums1 = [1, 2, 2, 1],
    nums2 = [2, 2];

function filterCommon(arr1, arr2) {
    return arr1.filter(item => {
        return arr2.includes(item)
    })
}


// 给定一个长度是101得数组，数组里有100个不相同得数据，找出来重复得数据
let arr100 = [4, 5, 2, 3, 0, 5, 1, 6, 9, 7, 8]

function getRepeateNum1(arr) {
    let target;
    arr.reduce((sum, cur) => {
        if (!sum.includes(cur)) {
            sum.push(cur);
        } else {
            target = cur
        }
        return sum;
    }, [])
    return target
}

console.log('getRepeateNum:', getRepeateNum(arr100))

// 给定一个长度是101得数组，数组里前100个是不相同得数据，找出来重复得数据
arr100 = [4, 5, 2, 3, 0, 1, 6, 9, 7, 8, 5]

function getRepeateNum2(arr) {
    const tempArr = [...arr];
    tempArr.pop()
    let target1 = eval(tempArr.join("+"));
    let target2 = eval(arr.join("+"));
    return target2 - target1
}

console.log('getRepeateNum2:', getRepeateNum2(arr100))
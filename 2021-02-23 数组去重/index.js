/**
 * 数组去重
// Array.from('\u6211\u7231\u6572\u4ee3\u7801').join(''); 我爱敲代码
 */

const arr = [1, 1, '', 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, '', 'NaN', 0, 0, 'a', 'a', {}, {}];

// 方法一 Set
// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值
// NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（NaN被认为是相同的，尽管 NaN !== NaN）
const arr_unique1 = arr => {
    return [...new Set(arr)];
    //return  Array.from(new Set(arr));
}
console.log('arr_unique1', arr_unique1(arr));
// arr_unique1 (13) [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]

// 方法二 Map
// Map是一组键值对的结构
// 一个key只能对应一个value。多次对一个key放入value，后面的值会把前面的值冲掉。
const arr_unique2 = arr => {
    let map = new Map();
    arr.forEach(item => {
        map.set(item, true);
    });
    return [...map.keys()];
}
console.log('arr_unique2', arr_unique2(arr));
// arr_unique2 (13) [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]


//方法三 递归
const arr_unique3 = arr => {
    let array = [...arr];
    let len = array.length;
    const loop = index => {
        if (index >= 1) {
            if (array[index] === array[index - 1]) {
                array.splice(index, 1);
            }
            loop(index - 1); //递归loop，然后数组去重
        }
    }

    array.sort((a, b) => a - b);
    loop(len - 1);
    return array;
}
console.log('arr_unique3', arr_unique3(arr));
// arr_unique3 (14) [1, "true", false, null, 0, true, 15, NaN, NaN, "NaN", "a", {…}, {…}, undefined]

// 方法四 forEach + includes
const arr_unique4 = arr => {
    let array = [];
    arr.forEach(item => !array.includes(item) && array.push(item))
    return array;
}
console.log('arr_unique4', arr_unique4(arr));
// arr_unique4 (13) [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]

// 方法五 reduce
// array.reduce(function(accumulator, currentValue, currentIndex, array), initialValue)
const arr_unique5 = arr => {
    return arr.reduce((accumulator, current) => accumulator.includes(current) ? accumulator : accumulator.concat(current), [])
}
console.log('arr_unique5', arr_unique5(arr));
// arr_unique5 (13) [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]

//方法六 hasOwnProperty+JSON.stringify
function arr_unique6(arr) {
    var hash = {};
    return arr.filter((val) => {
        return hash.hasOwnProperty(typeof val + JSON.stringify(val)) ? false : hash[typeof val + JSON.stringify(val)] = true;
    });
}
console.log('arr_unique6', arr_unique6(arr));
// arr_unique6 (12) [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]
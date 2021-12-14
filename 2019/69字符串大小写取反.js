/*
* 第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
* A - Z         a - z
* 65- 90        97- 122
* 字符串比大小：按每个字符的 charCode 大小进行比较，直到分出大小为止。
*/ 
function reverseUpperOrDown(str){
    // let result=str.split('').map(item=>{if(item<='Z'){return item.toLowerCase()}else{return item.toUpperCase()}}).join('');//自己的想法
    let result=str.split('').map(item=>{return item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();}).join('');//另外的思路
    console.log(result);
    return result
}